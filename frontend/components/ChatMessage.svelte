<script>
	import { beforeUpdate } from 'svelte';
	import axios from 'axios';
	import { addMinutes, format } from 'date-fns';
	import { es } from 'date-fns/locale';
	import tagParser from 'js-bbcode-parser';
	export let timestamp, username, message, isRoleplay, deleted, deletionReason;

	let userAvatar = '';

	beforeUpdate(async() => {
		axios.get(`https://cors-anywhere.herokuapp.com/https://community.fandom.com/api/v1/User/Details?ids=${username}`).then((response) => {
			let body = response.data;
			if (body.items && body.items[0] && body.items[0].avatar) {
				userAvatar = body.items[0].avatar;
			}
		}).catch((err) => {
			console.error(`Error loading ${username}'s avatar: ${err}`);
			userAvatar = 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/100';
		});
	});
</script>

<main>
	<article class="media message is-half">
	  <figure class="media-left image is-64x64">
	    <img class="user-avatar" src={userAvatar} alt="Avatar de {username}">
	  </figure>
	  <div class="media-content">
	    <strong>{username}</strong>
	    <small>{format(addMinutes(new Date(timestamp), new Date(timestamp).getTimezoneOffset()), "d 'de' MMMM 'de' yyyy, h:mm:ss aa", {
	    	locale: es
	    })}</small>
	    <br />
	    <div class="msg-content">
	    	{#if deleted}
	    		<ion-icon name="trash"></ion-icon> <i>Este elemento ha sido eliminado. Razón: {deletionReason}</i>
	    	{:else}
		    	{#if isRoleplay}
		    		<i>* {username} {@html tagParser.parse(message || '')}</i>
		    	{:else}
		    		{@html tagParser.parse(message || '')}
		    	{/if}
	    	{/if}
	    </div>
	  </div>
	</article>
</main>

<style type="text/css">
	.message {
		margin-top: 10px;
		margin-bottom: 10px;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 10px;
	}

	.user-avatar {
		border-radius: 6px;
	}
</style>