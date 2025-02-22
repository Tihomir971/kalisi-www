<script lang="ts">
	import { onMount } from 'svelte';

	export let lat: number;
	export let lng: number;
	export let zoom: number = 13;

	let mapElement: HTMLElement;
	let apiKey: string;

	onMount(async () => {
		const response = await fetch('/api/google-maps-key');
		const data:{apiKey:string} = await response.json();
		console.log("data", data);
		
		apiKey = data.apiKey;

		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
		script.async = true;
		script.defer = true;
		script.onload = initMap;
		document.head.appendChild(script);
	});

	function initMap() {
		const map = new google.maps.Map(mapElement, {
			center: { lat, lng },
			zoom: zoom
		});

		new google.maps.Marker({
			position: { lat, lng },
			map: map
		});
	}
</script>

<div bind:this={mapElement} class="w-full h-[500px] aspect-square rounded-lg"></div>
