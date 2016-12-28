$( document ).ready(function() {
	$('#list-all').hide();
	BibJS.Init('bib/bibl.bib', 'scripts', function(biblist) {
		biblist.sort(['year', 'month'], 'DESC');
		
		biblist.addMyName("Ricardo J. Dias");
		biblist.addAuthorLinkMap({
			"João M. Lourenço": "http://docentes.fct.unl.pt/joao-lourenco/",
			"Nuno M. Preguiça": "http://asc.di.fct.unl.pt/~nmp/",
			"Dino Distefano": "http://www.eecs.qmul.ac.uk/~ddino/",
			"João Costa Seco": "http://docentes.fct.unl.pt/jrcs/",
			"Tiago M. Vale": "http://novasys.di.fct.unl.pt/~tvale",
			"Heiner Litz": "http://web.stanford.edu/~hlitz"
		});
		
		BibJS.Render(biblist, "#bibtex_list", "selected");
		$('#see-all-publ').click(function() {	
			$('#list-sel').hide();		
			$('#list-all').show();
			$('#bibtex_list').empty();
			BibJS.Render(biblist, "#bibtex_list");
		});
		$('#see-selected-publ').click(function() {
			$('#list-all').hide();
			$('#list-sel').show();		
			$('#bibtex_list').empty();
			BibJS.Render(biblist, "#bibtex_list", "selected");
		});
	});
	
	
	
/*	
	$.get('scripts/bibtex_grammar.pegjs', function(data) {
	    var parser = PEG.buildParser(data);
		$.get('bib/bibl.bib', function(data) {
			var entries = parser.parse(data);
			$.each(entries, function(i,entry) {
				var en = new BibEntry.Create(entry);
				if (entry.type != "a") {
					var map = {};
					$.each(entry.values, function(i, kv) {
						map[kv.key] = kv.value;
					})
					if (map.year != undefined) {
						$("#bibtex_list").append("<dt>"+map.year+"</dt>");
					}
					if (map.author != undefined) {
						$("#bibtex_list").append("<dd>"+map.author+"</dd>");
					}
					if (map.title != undefined) {
						$("#bibtex_list").append("<dd>"+map.title+"</dd>");
					}
				}

			});

		}, 'text');
	}, 'text');
	
*/
 
});
