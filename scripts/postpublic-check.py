"""Self-contained integrity and navigation checker for the local post-public successor."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote
import hashlib
import json
import re
import sys

sys.dont_write_bytecode = True
TOKEN = 'PASS_EXACT_SITE_POSTPUBLIC_11_CARD_BUILD_R1'

def sha(b):
    return hashlib.sha256(b).hexdigest()

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.ids, self.links, self.meta, self.canonical = set(), [], {}, None
        self.mains = 0
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, ('duplicate fragment', a['id'])
            self.ids.add(a['id'])
        if tag == 'main': self.mains += 1
        if tag == 'meta': self.meta[a.get('name', a.get('property', a.get('http-equiv', ''))).lower()] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        for key in ('href', 'src', 'poster'):
            if key in a: self.links.append((tag, key, a[key], a.get('rel')))

def check(root):
    root = Path(root)
    paths = {p.relative_to(root).as_posix(): p for p in root.rglob('*') if p.is_file() and '__pycache__' not in p.parts}
    expected = json.loads(paths['MANIFEST.json'].read_text(encoding='utf-8'))['files']
    actual = [{'path': n, 'bytes': p.stat().st_size, 'sha256': sha(p.read_bytes())} for n,p in sorted(paths.items()) if n not in ('MANIFEST.json','SHA256SUMS.txt')]
    assert expected == actual, 'manifest inventory'
    assert paths['SHA256SUMS.txt'].read_text(encoding='utf-8') == ''.join(x['sha256']+'  '+x['path']+'\n' for x in expected)
    state=json.loads(paths['release-state.json'].read_text(encoding='utf-8'))
    adapter=json.loads(paths['WORKBENCH_ADAPTER.json'].read_text(encoding='utf-8'))
    binding=json.loads(paths['SITE_EXPORT_BINDING.json'].read_text(encoding='utf-8'))
    base=state['base']; origin=state['canonical_origin']
    assert base in ('/','/exact-mathematics/') and origin=='https://exactmathematics.org'
    assert state['site_commit']==binding['site_commit']==adapter['site_commit']
    assert state['site_tree']==binding['site_tree']==adapter['site_tree']
    assert state['first_publication_date']=='2026-09-17' and state['brief_first_publication_date']=='2026-09-17'
    assert (state['public_cards'],state['mankiewicz_public_cards'],state['mankiewicz_canonical_card_links'],state['sphere_rigidity_public_cards'])==(11,11,11,0)
    assert state['formspree_automated_live_posts']==0 and adapter['selected_public_presentation']['canonical_cards']==11
    assert adapter['selected_public_presentation']['route_manifest_sha256']=='cc97b7b8aaef8208b3a877c64bbc4b4bb526c4f0ed5a7b831b4de8978b0b7968'
    pages={n:Page(p.read_text(encoding='utf-8')) for n,p in paths.items() if n.endswith('.html')}
    links=0
    for n,p in pages.items():
        t=paths[n].read_text(encoding='utf-8')
        visible=re.sub(r'<[^>]+>',' ',re.sub(r'<(script|style)\b[^>]*>[\s\S]*?</\1>','',t,flags=re.I))
        if state['profile']=='FULL_LAUNCH':
            assert not re.search(r'\bcandidate\b|private preview|local review|not yet public|public Card links are not yet active',visible,re.I), ('public terminology',n)
        assert p.mains==1, ('main',n)
        assert 'content-security-policy' in p.meta and 'default-src' in p.meta['content-security-policy'], ('CSP',n)
        excluded=bool(re.match(r'^(?:404\.html|research/sr/|corrections/(?:received|demo)/)',n))
        support=bool(re.match(r'^mathlibannex/(?:sources/|verification/|releases/candidate-r1/|overviews/mankiewicz/boundary\.html)',n))
        assert ('noindex' in p.meta['robots'])==(excluded or support), ('robots',n)
        canonical=origin+base+('research/sphere-rigidity/' if n=='research/sr/index.html' else n.removesuffix('index.html'))
        assert p.canonical==canonical and p.meta.get('og:url')==canonical, ('canonical',n)
        for tag,key,value,relattr in p.links:
            u=urlsplit(value)
            if u.scheme or u.netloc:
                assert u.scheme=='https' and tag in ('a','link') and (tag!='link' or relattr=='canonical'), (n,value)
                continue
            target=urlsplit(urljoin('http://local'+base+n,value))
            assert target.path.startswith(base), (n,value)
            rel=unquote(target.path[len(base):]); rel+= 'index.html' if not rel or rel.endswith('/') else ''
            assert rel in paths, (n,value,rel)
            if target.fragment: assert rel in pages and unquote(target.fragment) in pages[rel].ids, (n,value,'fragment')
            links+=1
    article_rows=[r for r in adapter['mounted'] if 'accepted_article_sha256' in r]
    assert len(article_rows)==11
    for row in adapter['mounted']:
        b=paths[row['path']].read_bytes()
        assert len(b)==row['bytes'] and sha(b)==row['sha256'], row['path']
        if 'accepted_article_sha256' in row:
            article=re.search(rb'<article\b[^>]*>[\s\S]*?</article>',b)
            assert article and sha(article[0])==row['accepted_article_sha256'], row['path']
    man=paths['mathlibannex/projects/mankiewicz/index.html'].read_text(encoding='utf-8')
    assert man.count('Read canonical Card')==11 and man.count('Immediate prerequisites:')==11 and man.count('Used by:')==11
    catalog=paths['mathlibannex/catalog/index.html'].read_text(encoding='utf-8')
    assert 'whole-library Catalog contains 11 canonical Cards' in catalog and '11 canonical Cards in the Mankiewicz Project' not in catalog
    hub=paths['mathlibannex/index.html'].read_text(encoding='utf-8')
    assert 'MathlibAnnex v0.2.0 source: public' in hub and 'Sphere Rigidity: 0 public Cards' in hub
    for slug,num in [('mankiewicz',11),('sphere-rigidity',0)]:
        data=json.loads(paths[f'mathlibannex/data/project-presentation-r1/{slug}/project.json'].read_text(encoding='utf-8'))
        rows=data.get('cards',data.get('nodes'))
        assert sum(x['card_resolution']=='PUBLIC' for x in rows)==num
    for name,h in adapter['selected_public_presentation']['fonts'].items():
        assert sha(paths['mathlibannex/assets/'+name].read_bytes())==h
    assert not any(n.endswith(('.zip','.bundle','.map','.tex','.bib','.sty')) or n.startswith(('.git/','AUDIT/')) for n in paths)
    sitemap=paths['sitemap.xml'].read_text(encoding='utf-8')
    for n in ['mathlibannex/catalog/','mathlibannex/overviews/mankiewicz/','mathlibannex/projects/mankiewicz/']:
        assert origin+base+n in sitemap
    assert sitemap.count('/mathlibannex/cards/')==11
    return {'status':'PASS','profile':state['profile'],'base':base,'html_pages':len(pages),'links_and_fragments':links,'cards':11,'files':len(paths)}

if __name__=='__main__':
    try:
        print(json.dumps(check(Path(__file__).resolve().parent),sort_keys=True))
        print(TOKEN)
    except Exception as exc:
        print('FAIL_POSTPUBLIC_11_CARD_BUILD: '+repr(exc))
        sys.exit(1)
