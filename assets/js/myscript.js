$( document ).ready(function() {
	$('#list-all').hide();
	BibJS.Init('bib/bibl.bib', 'assets', function(biblist) {
		biblist.sort(['year', 'month'], 'DESC');

		biblist.addMyName("Ricardo J. Dias");
		biblist.addAuthorLinkMap({
			"João M. Lourenço": "http://docentes.fct.unl.pt/joao-lourenco/",
			"Nuno M. Preguiça": "http://asc.di.fct.unl.pt/~nmp/",
			"Dino Distefano": "http://www.eecs.qmul.ac.uk/~ddino/",
			"João Costa Seco": "http://docentes.fct.unl.pt/jrcs/",
			"Tiago M. Vale": "http://tvale.github.io",
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

});
