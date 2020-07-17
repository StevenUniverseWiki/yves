<script>
	import { beforeUpdate } from 'svelte';
	import { addSeconds, lightFormat, formatDistance } from 'date-fns';
	import { es } from 'date-fns/locale';
	
	export let event, user, timestamp, targetUser, banLength, banReason, deleted, deletionReason;

	let banExpiry;
	beforeUpdate(() => {
		if (event === 'BAN') banExpiry = addSeconds(new Date(timestamp), banLength);		
	});
</script>

<main>
	<div class="system-message media message is-half">
		<div class="media-content message-text">
			<small>[{lightFormat(new Date(timestamp), "dd/MM/yyyy, h:m:s aaaa", {
				    	locale: es
				    })}]</small>
			{#if event === 'JOIN'}
				{user} ha entrado al chat.
			{:else if event === 'PART'}
				{user} ha salido del chat.
			{:else if event === 'KICK'}
				{targetUser} fue expulsado por {user}.
			{:else if event === 'BAN'}
				{targetUser} fue baneado por {user} durante {formatDistance(banExpiry, new Date(timestamp), {
					locale: es
				})} (razón: {banReason}).
			{:else if event === 'UNBAN'}
				{user} revocó el ban de {targetUser} (razón: {banReason}).
			{/if}
		</div>
	</div>
</main>

<style type="text/css">
	.system-message {
		text-align: center;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.system-message .message-text {
		text-align: center;
		padding: 6px;
		border-radius: 6px;
	}
	
</style>