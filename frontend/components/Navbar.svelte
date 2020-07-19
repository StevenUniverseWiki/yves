<script>
  export let title;

  let mobileNavbarActive = false;
</script>

<nav class="navbar is-light" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item">
			<img class="nav-logo" src="https://vignette.wikia.nocookie.net/universosteven/images/8/89/Wiki-wordmark.png/revision/latest/scale-to-width-down/100?cb=20200108003928&path-prefix=es" alt="Logo de Steven Universe Wiki" width="100" height="51">
			<strong>{title}</strong>
		</a>

		<a role="button" class="navbar-burger burger" class:is-active={mobileNavbarActive} aria-label="menu" aria-expanded="false" data-target="main_nav" on:click={() => {mobileNavbarActive = !mobileNavbarActive}}>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
	</div>
	<div id="main_nav" class="navbar-menu" class:is-active={mobileNavbarActive}>
		<div class="navbar-start">

		</div>
		<div class="navbar-end">
			<span class="navbar-item">Accesos directos:</span>
			<div class="navbar-item">
				<div class="buttons">
					<a class="button is-primary" href="https://steven-universe.fandom.com/es/wiki/Especial:Chat" target="_blank" rel="noopener">
						<strong>Chat</strong>
					</a>
					<a class="button is-light" href="https://steven-universe.fandom.com/es/wiki/Especial:Registro" target="_blank" rel="noopener">
						Special:Log
					</a>
					<a class="button is-light" href="https://steven-universe.fandom.com/es/wiki/Especial:Bloquear" target="_blank" rel="noopener">
						Bloquear
					</a>
				</div>
			</div>
		</div>
	</div>
</nav>

<style type="text/css">
.nav-logo {
  width: auto !important;
  max-height: 50px !important;
  margin-right: 10px;
}
</style>