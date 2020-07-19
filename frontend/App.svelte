<script>
  // components
  import Navbar from './components/Navbar.svelte'
  import Footer from './components/Footer.svelte'

  // children views
  import LogSearchView from './views/LogSearchView.svelte'
  import LiveChatView from './views/LiveChatView.svelte'
  import AnalyticsView from './views/AnalyticsView.svelte'

  import io from 'socket.io-client';
  import feathers from '@feathersjs/client';

  let currentTab = 'logs';
  let analyticsTabLoaded = false;
  const socket = io();
  const client = feathers();
  client.configure(feathers.socketio(socket));  
</script>

<main>
  <Navbar title="Registros de chat"/>
  <section class="section">
  <div class="container">
  <div class="tabs is-fullwidth">
    <ul>
      <li class:is-active="{currentTab === 'logs'}" on:click="{() => currentTab = 'logs' }">
        <a>
          <span class="icon is-small"><ion-icon name="document-text-outline"></ion-icon></span>
          <span>Buscar mensajes</span>
        </a>
      </li>
      <li class:is-active="{currentTab === 'live-chat'}" on:click="{() => currentTab = 'live-chat' }">
        <a>
          <span class="icon is-small"><ion-icon name="chatbubbles-outline"></ion-icon></span>
          <span>Chat en directo</span>
        </a>
      </li>
      <li class:is-active="{currentTab === 'analytics'}" on:click="{() => { currentTab = 'analytics'; analyticsTabLoaded = true }}">
        <a>
          <span class="icon is-small"><ion-icon name="analytics-outline"></ion-icon></span>
          <span>Estadísticas</span>
        </a>
      </li>
    </ul>
  </div>
  <LogSearchView client={client} active={currentTab === 'logs'} />
  <LiveChatView client={client} active={currentTab === 'live-chat'} />
  {#if analyticsTabLoaded}
    <AnalyticsView active={currentTab === 'analytics'} />
  {/if}
</div>
</section>
<Footer/>
</main>

<style>
  .section {
    padding: 0.8rem 1.5rem;
  }

  .tabs {
    margin-top: 10px;
  }
</style>
