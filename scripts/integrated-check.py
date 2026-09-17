"""Self-contained checker copied into each built RC5 site."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote
import hashlib
import json
import re
import sys

sys.dont_write_bytecode = True
TOKEN = 'PASS_EXACT_SITE_RC5_INTEGRATED_ROOT_R1'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.links = []
        self.meta = {}
        self.forms = []
        self.mains = 0
        self.canonical = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, ('duplicate id', a['id'])
            self.ids.add(a['id'])
        if tag == 'main':
            self.mains += 1
        if tag == 'meta':
            self.meta[a.get('name', a.get('property', a.get('http-equiv', ''))).lower()] = a.get('content', '')
        if tag == 'form':
            self.forms.append(a)
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical = a.get('href')
        for key in ('href', 'src', 'poster'):
            if key in a:
                self.links.append((tag, key, a[key], a.get('rel')))
        if tag == 'script':
            assert 'src' in a, 'Inline executable script'


def check_fix1_presentation(sr_page, man_page, hub):
    assert 'MathlibAnnex v0.2.0 source public' in sr_page and 'Local Companion review' in sr_page
    assert '467 exact declarations are not provisional Cards' in sr_page
    assert not any(x in sr_page for x in ('not yet available here', 'will be added as they become ready'))
    assert 'no Project or Card publication has occurred' in sr_page
    context = re.search(r'<nav aria-label="Project context">([\s\S]*?)</nav>', man_page)
    assert context and 'Mankiewicz Theorem Project' in context[1] and 'Sphere Rigidity' not in context[1]
    assert 'research/sphere-rigidity/' not in context[1]
    assert 'actual-source-bound successor' not in hub and 'accepted source–exposition records' not in hub


def check(root):
    root = Path(root)
    paths = {p.relative_to(root).as_posix(): p for p in root.rglob('*') if p.is_file() and '__pycache__' not in p.parts}
    expected = json.loads(paths['MANIFEST.json'].read_text(encoding='utf-8'))['files']
    actual = [{'path': n, 'bytes': p.stat().st_size, 'sha256': sha(p)} for n, p in sorted(paths.items()) if n not in ('MANIFEST.json', 'SHA256SUMS.txt')]
    assert expected == actual, 'file inventory'
    assert paths['SHA256SUMS.txt'].read_text(encoding='utf-8') == ''.join(r['sha256'] + '  ' + r['path'] + '\n' for r in expected), 'checksums'
    binding = json.loads(paths['SITE_EXPORT_BINDING.json'].read_text(encoding='utf-8'))
    adapter = json.loads(paths['WORKBENCH_ADAPTER.json'].read_text(encoding='utf-8'))
    base, profile = binding['base'], binding['profile']
    live = binding['feedback_mode'] == 'LIVE_PUBLIC'
    indexable = profile in ('INDEXABLE_QUALIFICATION', 'FULL_LAUNCH')
    qualification = profile == 'PUBLIC_RELEASE_QUALIFICATION'
    public_wording = qualification or profile == 'FULL_LAUNCH'
    origin = binding.get('canonical_origin', 'https://exactmathematics.org')
    assert re.fullmatch(r'https://[A-Za-z0-9.-]+', origin)
    assert binding.get('deployment_profile') == ('ROOT' if base == '/' else 'SUBPATH')
    if public_wording:
        assert re.fullmatch('[a-f0-9]{40}', binding['site_commit']) and re.fullmatch('[a-f0-9]{40}', binding['site_tree'])
        assert re.fullmatch(r'https://github.com/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+', binding['public_repository'])
    assert adapter['site_commit'] == binding['site_commit'] and adapter['site_tree'] == binding['site_tree']
    assert adapter['base'] == base and adapter['source']['tag'] == 'v0.2.0'
    assert adapter['source']['commit'] == '30963f26ac8ffa3dc3e9ec9de91fd0f9daf05305'
    assert adapter['source']['tree'] == 'b3378851a5287f5e3c8418f668e4d0ba52718739'
    assert adapter['counts']['canonical_card_links'] == 0 and adapter['counts']['sphere_nodes'] == 467
    if public_wording:
        successor = adapter['public_presentation_successor']
        assert successor['outer_zip']['sha256'] == '6cc9215b87fc928b9bd1aa6266b09fc1b020cdd1cfed599b4cea187f134b805d'
        assert successor['route_manifest']['sha256'] == '175214ab08c062f6a04a20da02653c4def3e6abf6815f858ef84822b1c7eb94f'
        assert successor['presentation_profile'] == 'PROJECT_PUBLIC_PRESENTATION_R1'
        assert len(successor['selected_files']) == 20
    for row in adapter['mounted']:
        p = paths[row['path']]
        assert p.stat().st_size == row['bytes'] and sha(p) == row['sha256'], row['path']
        if 'preserved_main_sha256' in row:
            html = p.read_text(encoding='utf-8')
            start = re.search(r'<div class="wb-project"[^>]*>', html).end()
            end = html.index('</div><p class="wb-feedback">', start)
            assert hashlib.sha256(html[start:end].encode('utf-8')).hexdigest() == row['preserved_main_sha256'], row['path']
    for row in binding['pdfs']:
        assert paths[row['path']].stat().st_size == row['bytes'] and sha(paths[row['path']]) == row['sha256']
    pages = {n: Page(p.read_text(encoding='utf-8')) for n, p in paths.items() if n.endswith('.html')}
    links = 0
    definitions = 0
    for n, page in pages.items():
        t = paths[n].read_text(encoding='utf-8')
        visible = re.sub('<[^>]+>', ' ', re.sub(r'<(script|style)\b[^>]*>[\s\S]*?</\1>', '', t))
        assert not re.search(r'\bP2-[\w-]+|\bRC\d+\b|owner-host|private canonical source|formal public admission not granted', visible, re.I), (n, 'workflow prose')
        definitions += visible.count('Lean for Human (LFH) is the human-readable layer')
        assert page.mains == 1 and 'site-top' in page.ids and 'back-to-top' in t, n
        csp = page.meta.get('content-security-policy', '')
        assert "script-src 'self'" in csp and "style-src 'self'" in csp and "object-src 'none'" in csp, n
        excluded = bool(re.match(r'^(?:404\.html|research/sr/|corrections/(?:received|demo)/)', n))
        assert ('noindex' in page.meta['robots']) == (not indexable or excluded), n
        canonical = origin + base + ('research/sphere-rigidity/' if n == 'research/sr/index.html' else n.removesuffix('index.html'))
        assert page.canonical == canonical and page.meta.get('og:url') == canonical, n
        for form in page.forms:
            assert live and n == 'corrections/index.html' and form.get('action') == 'https://formspree.io/f/mrpgwrbd' and form.get('method', '').upper() == 'POST'
        for tag, key, value, relattr in page.links:
            u = urlsplit(value)
            if u.scheme or u.netloc:
                assert u.scheme == 'https' and ((tag == 'a' and key == 'href') or (tag == 'link' and relattr == 'canonical')), (n, value)
                assert not any(x in value for x in ('mathlib-annex-staging', 'localhost', '127.0.0.1')), (n, value)
                continue
            target = urlsplit(urljoin('http://local' + base + n, value))
            assert target.path.startswith(base), (n, value)
            rel = unquote(target.path[len(base):])
            rel += 'index.html' if not rel or rel.endswith('/') else ''
            assert rel in paths, (n, value, rel)
            if target.fragment:
                assert rel in pages and unquote(target.fragment) in pages[rel].ids, (n, value, 'fragment')
            links += 1
    assert definitions == 1, definitions
    for slug in ('sphere-rigidity', 'mankiewicz'):
        prefix = f'mathlibannex/projects/{slug}/'
        assert prefix + 'index.html' in pages and prefix + 'project.json' in paths
        if public_wording:
            assert f'mathlibannex/data/project-presentation-r1/{slug}/presentation-binding.json' in paths
        else:
            assert prefix + 'LFH_PROJECT_MANIFEST.json' in paths
        data = json.loads(paths[prefix + 'project.json'].read_text(encoding='utf-8'))
        rows = data.get('nodes', data.get('cards'))
        assert len(rows) == (467 if slug == 'sphere-rigidity' else 11)
        assert all(x['canonical_card_link'] is None and x['card_resolution'] != 'PUBLIC' for x in rows)
        assert data['source_binding']['commit'] == adapter['source']['commit']
        if public_wording:
            assert data['status']['exposure'] == 'HOSTING_RELEASE_RECORD'
    assert not any(n.startswith(('mathlibannex/cards/', 'mathlibannex/overviews/', 'mathlibannex/sources/', 'mathlibannex/catalog/')) for n in paths)
    assert 'MathlibAnnex v0.2.0' in paths['mathlibannex/releases/v0.2.0/index.html'].read_text(encoding='utf-8')
    assert 'MathlibAnnex v0.1.0' in paths['mathlibannex/releases/v0.1.0/index.html'].read_text(encoding='utf-8')
    assert 'Correspondence between the Brief Report' in paths['research/sphere-rigidity/index.html'].read_text(encoding='utf-8')
    if not public_wording:
        check_fix1_presentation(paths['research/sphere-rigidity/index.html'].read_text(encoding='utf-8'), paths['mathlibannex/projects/mankiewicz/index.html'].read_text(encoding='utf-8'), paths['mathlibannex/index.html'].read_text(encoding='utf-8'))
    boundary = json.loads(paths['licensing/boundary.json'].read_text(encoding='utf-8'))
    state = json.loads(paths['release-state.json'].read_text(encoding='utf-8'))
    if qualification:
        assert boundary['status'] == 'PUBLIC_WORDING_QUALIFICATION_ONLY' and boundary['effective_now'] is False and boundary['effective_date'] is None
        assert state['publication_state'] == 'QUALIFICATION_ONLY_NOT_PUBLISHED' and state['content_terms'] == 'PUBLIC_WORDING_QUALIFICATION_ONLY'
        assert state['indexing'] == 'QUALIFICATION_NOINDEX' and state['formspree_submissions_intercepted'] is True
        assert 'form-action &#39;none&#39;' in paths['corrections/index.html'].read_text(encoding='utf-8') or "form-action 'none'" in paths['corrections/index.html'].read_text(encoding='utf-8')
    elif profile != 'FULL_LAUNCH':
        assert boundary['status'] == 'OWNER_APPROVED_PENDING_PUBLICATION' and boundary['effective_now'] is False and boundary['effective_date'] is None
        assert state['publication_state'] == 'NOT_PUBLISHED' and state['first_publication_date'] is None
    else:
        assert state['publication_state'] == 'AUTHORIZED_PUBLIC_RELEASE' and state['indexing'] == 'PUBLIC_INDEXABLE' and boundary['effective_now'] is True
    assert state['source'] == 'PUBLISHED_V0_2_0' and state['site_commit'] == binding['site_commit'] and state['site_tree'] == binding['site_tree'] and state['formspree_automated_live_posts'] == 0
    assert bool(pages['corrections/index.html'].forms) == live
    assert ('Disallow: /\n' in paths['robots.txt'].read_text()) == (not indexable)
    sitemap = paths['sitemap.xml'].read_text()
    assert 'mathlibannex/projects/sphere-rigidity/' in sitemap and 'mathlibannex/projects/mankiewicz/' in sitemap
    assert 'research/sr/' not in sitemap and 'corrections/received/' not in sitemap
    assert not any(n.endswith(('.zip', '.bundle', '.map', '.tex', '.bib', '.sty')) or 'private-input' in n or n.startswith(('.git/', 'AUDIT/')) for n in paths)
    sr = paths['research/sphere-rigidity/index.html'].read_text(encoding='utf-8')
    assert '15 September 2026' in sr and 'Kadets' in sr and 'Banakh' in sr and 'not a guarantee that no earlier result exists' in sr
    return {'status': 'PASS', 'base': base, 'profile': profile, 'html_pages': len(pages), 'files': len(paths), 'local_links_and_fragments': links, 'cards': 0, 'mounted': len(adapter['mounted'])}


if __name__ == '__main__':
    try:
        print(json.dumps(check(Path(__file__).resolve().parent), sort_keys=True))
        print(TOKEN)
    except Exception as exc:
        print('FAIL_EXACT_SITE_RC5_INTEGRATED_ROOT_R1: ' + str(exc))
        sys.exit(1)
