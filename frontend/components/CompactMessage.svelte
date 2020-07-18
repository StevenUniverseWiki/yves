<script>
	import { beforeUpdate } from 'svelte';
	import tagParser from 'js-bbcode-parser';
	import { addMinutes, addSeconds, lightFormat, formatDistance } from 'date-fns';
	import { es } from 'date-fns/locale';

	export let event, user, timestamp, text, targetUser, banLength, banReason, deleted, deletionReason;

	let banExpiry;
	beforeUpdate(() => {
		if (event === 'BAN') banExpiry = addSeconds(new Date(timestamp), banLength);
	});
</script>

<main>
	<article class="media message is-half">
	  <div class="media-content">
	  	<small>[{lightFormat(addMinutes(new Date(timestamp), new Date(timestamp).getTimezoneOffset()), "dd/MM/yyyy, h:mm:ss aa", {
	    	locale: es
	    })}]</small>
	    {#if deleted}
	    	<strong>&lt;{user}&gt;</strong>: <ion-icon name="trash"></ion-icon> <i>[Este elemento ha sido eliminado. Razón: {deletionReason}]</i>
	    {:else}
		  	{#if event === 'MESSAGE'}
			    <strong>&lt;{user}&gt;</strong>: {@html tagParser.parse(text || '')}
		  	{:else if event === 'ME'}
			    <strong>&lt;{user}&gt;</strong>: <i>* {user} {@html tagParser.parse(text || '')}</i>
			{:else if event === 'JOIN'}
				~ {user} ha entrado al chat. ~
			{:else if event === 'PART'}
				~ {user} ha salido del chat. ~
			{:else if event === 'KICK'}
				~ {targetUser} fue expulsado por {user}. ~
			{:else if event === 'BAN'}
				~ {targetUser} fue baneado por {user} durante {formatDistance(new Date(banExpiry), new Date(timestamp), {
					locale: es
				})} (razón: {banReason || 'no especificada'}). ~
			{:else if event === 'UNBAN'}
				~ {user} revocó el ban de {targetUser} (razón: {banReason || 'no especificada'}). ~
			{/if}
	    {/if}
	  </div>
	</article>
</main>

<style type="text/css">
	.message {
		margin-top: 6px;
		margin-bottom: 6px;
		padding-top: 6px;
		padding-bottom: 6px;
		padding-left: 6px;
	}
</style>