<script>
	import ChatMessage from '../components/ChatMessage.svelte';
	import SystemMessage from '../components/SystemMessage.svelte';
	import CompactMessage from '../components/CompactMessage.svelte';

	export let client, active;

	const messageService = client.service('api/entries');

	let query = {};
	let entries = [];
	let resultCount = 0;

	let uiState = {
		initial: true,
		loading: false,
		error: false,
		errorMessage: '',
		noResults: false,
		queryModalActive: false,
		// pagination
		prevDisabled: true,
		nextDisabled: false,
		prevLoading: false,
		nextLoading: false,
		// search fields
		textSearchField: '',
		searchIsCaseSensitive: false,
		searchIsRegex: false,
		searchRegexOptions: '',
		startTimestampField: '',
		endTimestampField: '',
		usernameField: '',
		targetUserField: '',
		events: {
			message: false,
			me: false,
			join: false,
			part: false,
			kick: false,
			ban: false,
			unban: false
		},
		limitField: 0,
		// pagination

		// display options
		compactMode: false,

	}

	function buildSearchQuery() {
		let searchQuery = {};
		if (uiState.textSearchField) {
			if (uiState.searchIsRegex) {
				searchQuery.text = {
					$regex: uiState.textSearchField.trim()
				}
				if (uiState.searchRegexOptions.trim()) searchQuery.text.$options = uiState.searchRegexOptions.trim();
			} else {
				searchQuery.text = {
					$search: uiState.textSearchField.trim()
				}
				if (uiState.searchIsCaseSensitive) searchQuery.text.$searchCaseSensitive = true;
			}
		}
		if (uiState.startTimestampField || uiState.endTimestampField) {
			searchQuery.timestamp = {};
			if (uiState.startTimestampField) searchQuery.timestamp.$gt = uiState.startTimestampField;
			if (uiState.endTimestampField) searchQuery.timestamp.$lt = uiState.endTimestampField;
		}
		if (uiState.usernameField) {
			let users = uiState.usernameField.split('|');
			searchQuery.user = users.length > 1 ? users : uiState.usernameField.trim();
		}
		if (uiState.targetUserField) {
			let users = uiState.targetUserField.split('|');
			searchQuery.targetUser = users.length > 1 ? users : uiState.targetUserField.trim();			
		}
		searchQuery.event = [];
		Object.entries(uiState.events).forEach((event) => {
			if (event[1]) searchQuery.event.push(event[0].toUpperCase());
		});
		if (uiState.limitField > 0) searchQuery.$limit = parseInt(uiState.limitField);
		if (!searchQuery.event.length) delete searchQuery.event;
		searchQuery.$sort = {
			timestamp: 1
		}

		return searchQuery;
	}

	function sendQuery() {
		console.log('Query:', query);
		return new Promise((resolve, reject) => {
			messageService.find({
				query: query
			}).then((results) => {
				console.log('Results:', results);
				uiState.noResults = (results.total === 0) ? true : false;
				entries = results.data;
				uiState.prevDisabled = results.skip === 0 ? true : false;
				uiState.nextDisabled = ((results.skip + (query.$limit || 100)) > results.total) ? true : false;
				resultCount = results.total;
				resolve();
			}).catch((err) => {
				console.error(err);
				uiState.errorMessage = err.message;
				uiState.error = true;
				uiState.loading = false;
			});
		})

	}

	function onSubmit() {
		if (uiState.initial) uiState.initial = false;
		query = buildSearchQuery();
		uiState.loading = true;
		sendQuery().then(() => {
			uiState.loading = false;
		});
	}

	function paginationPrevious() {
		query.$skip = query.$skip ? query.$skip - (query.$limit || 100) : 0;
		uiState.prevLoading = true;
		sendQuery().then(() => {
			uiState.prevLoading = false;
			document.getElementById("searchTop").scrollIntoView();
		});
	}

	function paginationNext() {
		query.$skip = query.$skip ? query.$skip + (query.$limit || 100) : query.$limit || 100;
		uiState.nextLoading = true;
		sendQuery().then(() => {
			uiState.nextLoading = false;
			document.getElementById("searchTop").scrollIntoView();
		});
	}

	function toggleQueryModal() {
		uiState.queryModalActive = !uiState.queryModalActive;
		if (uiState.queryModalActive) {
			query = buildSearchQuery();
		}
	}
</script>

<main hidden={!active}>
	<section class="logSearchInterface">
		<div class="notification is-info">
			<span class="icon is-medium">
				<ion-icon size="large" name="information-circle" role="img" class="md icon-large hydrated" aria-label="information circle"></ion-icon>
			</span>
			<span class="notif-message">Todos los horarios son mostrados en horario del wiki (UTC).</span>
		</div>
		<hr>
		<form>
			<div class="field">
				{#if uiState.searchIsRegex}
					<label class="label" for="regex">Expresión regular:</label>
					<div class="field has-addons">
							<p class="control is-expanded">
							<input class="input" type="text" id="regex" bind:value={uiState.textSearchField} placeholder="Pattern RegEx">
							</p>
							<p class="control">
							<input class="input" type="text" bind:value={uiState.searchRegexOptions} placeholder="Opciones RegEx">
							</p>
					</div>
				{:else}
					<label class="label" for="search">Texto a buscar:</label>
					<div class="control">
						<input class="input" id="search" type="text" name="search" bind:value={uiState.textSearchField}>
					</div>
				{/if}
				
			</div>
			<div class="field">
				{#if !uiState.searchIsRegex}
					<p class="control">
						<label class="label" for="case_sensitive">
							<input class="checkbox" id="case_sensitive" type="checkbox" name="case_sensitive" bind:checked={uiState.searchIsCaseSensitive}>
							Distinguir entre mayúsculas y minúsculas
						</label>
					</p>
				{/if}
				<p class="control">
					<label class="label" for="isregex">
						<input class="checkbox" id="isregex" type="checkbox" name="isregex" bind:checked={uiState.searchIsRegex}>
						Expresión regular
					</label>
				</p>
			</div>
			<hr>
			<div class="field is-horizontal">
				<div class="field-label is-normal">
					<label class="label" for="startdate">Fecha y hora inicial:</label>
				</div>
				<div class="field-body">
					<div class="field is-narrow">
						<div class="control">
							<input class="input" id="startdate" type="datetime-local" name="startdate" bind:value={uiState.startTimestampField}>
						</div>
					</div>
				</div>
			</div>
			<div class="field is-horizontal">
				<div class="field-label is-normal">
					<label class="label" for="enddate">Fecha y hora final:</label>
				</div>
				<div class="field-body">
					<div class="field is-narrow">
						<div class="control">
							<input class="input" id="enddate" type="datetime-local" name="enddate" bind:value={uiState.endTimestampField}>
						</div>
					</div>
				</div>
			</div>
			<hr>
			<strong>Búsqueda por usuarios</strong>: No utilizar guiones bajos en los nombres. Para buscar varios usuarios, separar los nombres con una pleca/barra vertical (<code>|</code>).
			<br />
			<strong>Usuario(s) objetivo</strong>: Aplicable para expulsiones/bans/desbaneos.
			<br /><br />
			<div class="field is-horizontal">
				<div class="field-label is-normal">
					<label class="label" for="users">Usuario(s):</label>
				</div>
				<div class="field-body">
					<div class="field is-narrow">
						<div class="control has-icons-left">
							<input class="input" id="users" type="text" name="users" bind:value={uiState.usernameField}>
							<span class="icon is-small is-left">
								<ion-icon size="large" name="person"></ion-icon>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="field is-horizontal">
				<div class="field-label is-normal">
					<label class="label" for="targets">Usuario(s) objetivo:</label>
				</div>
				<div class="field-body">
					<div class="field is-narrow">
						<div class="control has-icons-left">
							<input class="input" id="targets" type="text" name="targets" bind:value={uiState.targetUserField}>
							<span class="icon is-small is-left">
								<ion-icon size="large" name="person"></ion-icon>
							</span>						      	
						</div>
					</div>
				</div>
			</div>
			<hr>
			<strong>Eventos</strong> (no marcar ninguno para buscar todos):<br />
			<div class="field">
				<p class="control">
					<label class="label">
						<input class="checkbox" type="checkbox" value="MESSAGE" bind:checked={uiState.events.message}>
						Mensaje
					</label>
				</p>
				<p class="control">
					<label class="label">
						<input class="checkbox" type="checkbox" value="ME" bind:checked={uiState.events.me}>
						Mensaje /me
					</label>
				</p>
				<p class="control">
					<label class="label">
						<input class="checkbox" type="checkbox" value="JOIN" bind:checked={uiState.events.join}>
						Entrada
					</label>
				</p>
				<p class="control">
					<label class="label">
						<input class="checkbox" type="checkbox" value="PART" bind:checked={uiState.events.part}>
						Salida
					</label>
				</p>
				<p class="control">
					<label class="label">
						<input class="checkbox" type="checkbox" value="KICK" bind:checked={uiState.events.kick}>
						Expulsión
					</label>
				</p>
				<p class="control">
					<label class="label">
						<input class="checkbox" type="checkbox" value="BAN" bind:checked={uiState.events.ban}>
						Ban
					</label>
				</p>
				<p class="control">
					<label class="label">
						<input class="checkbox" type="checkbox" value="UNBAN" bind:checked={uiState.events.unban}>
						Ban revocado
					</label>
				</p>
			</div>
			<hr>

			<div class="field is-horizontal">
				<div class="field-label is-normal">
					<label class="label" for="limit">Límite:</label>
				</div>
				<div class="field-body">
					<div class="field is-narrow">
						<div class="control">
							<input class="input" type="number" name="limit" id="limit" bind:value={uiState.limitField}>
						</div>
					</div>
				</div>
			</div>
			<button type="button" class="button is-info" class:is-loading={uiState.loading} id="query" on:click={onSubmit}>Buscar</button>
			<button type="button" class="button" on:click={toggleQueryModal}>Mostrar consulta</button>
			<div class="modal" class:is-active={uiState.queryModalActive}>
			  <div class="modal-background" on:click={toggleQueryModal}></div>
			  <div class="modal-card">
			    <header class="modal-card-head">
			      <p class="modal-card-title">Consulta</p>
			      <button type="button" class="delete" aria-label="close" on:click={toggleQueryModal}></button>
			    </header>
			    <section class="modal-card-body">
					Este es el <i>objeto query</i> para la consulta construida con el formulario:
					<br /><br />
					<pre>
						{JSON.stringify(query, null, 3)}
					</pre>
			    </section>
			  </div>
			</div>
			<br />
		</form>
	</section>
	<hr>
	{#if uiState.error}
		<div class="notification is-danger">
		  <button class="delete" on:click={() => {uiState.error = false}}></button>
		  <b>Ocurrió un error</b>: ${uiState.errorMessage}
		</div>
	{/if}

	{#if uiState.noResults}
		<div class="notification is-info">
			<span class="icon is-medium">
				<ion-icon size="large" name="information-circle" role="img" class="md icon-large hydrated" aria-label="information circle"></ion-icon>
			</span>
			<span class="notif-message">La consulta no devolvió resultados.</span>
		</div>
	{/if}

	{#if entries.length}
		<div class="notification is-success">
			<span class="icon is-medium">
				<ion-icon size="large" name="information-circle" role="img" class="md icon-large hydrated" aria-label="information circle"></ion-icon>
			</span>
			<span class="notif-message">La consulta devolvió {resultCount} resultados.</span>
		</div>
		<div class="interface-options">
			<label class="label">
			<input class="checkbox" type="checkbox" bind:checked={uiState.compactMode}>
			Modo compacto (útil al copiar varios mensajes)
			</label>

			<nav class="pagination is-centered" role="navigation" aria-label="pagination" id="searchTop">
			  <button class="button pagination-previous" class:is-loading={uiState.prevLoading} on:click={paginationPrevious} disabled={uiState.prevDisabled}>Anterior</button>
			  <button class="button pagination-next" class:is-loading={uiState.nextLoading} on:click={paginationNext} disabled={uiState.nextDisabled}>Siguiente</button>
			</nav>
		</div>
		<hr>
		<div class="entries">
			{#each entries as entry}
				{#if uiState.compactMode}
					<CompactMessage {...entry}/>
				{:else}
					{#if entry.event === 'MESSAGE' || entry.event === 'ME'}
						<ChatMessage
							username={entry.user}
							timestamp={entry.timestamp}
							message={entry.text}
							isRoleplay={entry.event === 'ME'}
							deleted={entry.deleted}
							deletionReason={entry.deletionReason} />
					{:else}
						<SystemMessage {...entry} />
					{/if}				
				{/if}
			{/each}
		</div>
		<hr>
		<nav class="pagination is-centered" role="navigation" aria-label="pagination">
		  <button class="button pagination-previous" class:is-loading={uiState.prevLoading} on:click={paginationPrevious} disabled={uiState.prevDisabled}>Anterior</button>
		  <button class="button pagination-next" class:is-loading={uiState.nextLoading} on:click={paginationNext} disabled={uiState.nextDisabled}>Siguiente</button>
		</nav>
	{/if}
	<br />
</main>

<style>
	.notif-message {
	    position: relative;
	    bottom: 10px !important;
	    margin-left: 6px;
	}
	.modal {
		padding-left: 0.6rem;
		padding-right: 0.6rem;
	}
	.modal-card {
		border-radius: 6px;
	}
</style>

