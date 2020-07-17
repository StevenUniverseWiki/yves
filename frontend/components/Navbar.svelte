<script>
  import Navbar from '@vizuaalog/bulmajs/src/plugins/Navbar';

  export let title;
</script>

<nav class="navbar is-light" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item">
			<img class="nav-logo" src="https://vignette.wikia.nocookie.net/universosteven/images/8/89/Wiki-wordmark.png/revision/latest/scale-to-width-down/120?cb=20200108003928&format=original&path-prefix=es" alt="Logo de Steven Universe Wiki" width="100" height="51">
			<strong>{title}</strong>
		</a>

		<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="main_nav">
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
	</div>
	<div id="main_nav" class="navbar-menu">
		<div class="navbar-start">

		</div>
		<div class="navbar-end">
			<span class="navbar-item">Accesos directos:</span>
			<div class="navbar-item">
				<div class="buttons">
					<a class="button is-primary" href="https://steven-universe.fandom.com/es/wiki/Especial:Chat" target="_blank">
						<strong>Chat</strong>
					</a>
					<a class="button is-light" href="https://steven-universe.fandom.com/es/wiki/Especial:Registro" target="_blank">
						Special:Log
					</a>
					<a class="button is-light" href="https://steven-universe.fandom.com/es/wiki/Especial:Bloquear" target="_blank">
						Bloquear
					</a>
				</div>
			</div>
		</div>
	</div>
</nav>

<style type="text/css">
.nav-logo {
  max-width: 120px !important;
  max-height: 51px !important;
  margin-right: 10px;
}
</style>