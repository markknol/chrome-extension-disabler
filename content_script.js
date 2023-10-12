let extensions;

chrome.management.getAll((results) => {
	extensions = results;
	init();
	console.log(extensions);
});

function toggleExtension(id) {
	if (extensions) {
		let ext = extensions.find(ext => ext.id === id);
		if (ext) {
			chrome.management.setEnabled(
				id,
				!ext.enabled,
				() => chrome.management.getAll(results => extensions = results)
			);
		}
	}
}

function init() {
	// make list html
	extensionsList.innerHTML = extensions.filter(ext => ext.mayDisable).map(ext => 
	`<div class="row">
		<label>
			<input type="checkbox" ${ext.enabled ? "checked" : ""} data-id="${ext.id}" /> ${ext.name} <span class="version">${ext.version}</span>
		</label>
	</div>`).join("");
	
	// on checkbox input, toggle enabled state
	[...document.querySelectorAll("input[type='checkbox']")].forEach(cb => 
		cb.oninput = () => toggleExtension(cb.dataset.id)
	);
}