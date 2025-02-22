<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import GoogleMap from '$lib/GoogleMap.svelte';

	let visible = false;

	onMount(() => {
		visible = true;
	});

	const businessLocation = {
		lat: 43.89849853515625, // Replace with your business latitude
		lng: 20.413877487182617 // Replace with your business longitude
	};

	function decodeEmail(encodedEmail: string): string {
		return encodedEmail.replace(/\[at\]/g, '@').replace(/\[dot\]/g, '.');
	}

	function handleEmailClick(event: MouseEvent) {
		event.preventDefault();
		const target = event.target as HTMLAnchorElement;
		const decodedEmail = decodeEmail(target.dataset.email || '');
		window.location.href = `mailto:${decodedEmail}`;
	}

	const obfuscatedEmail = 'info[at]kalisi[dot]com';

	function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const formValues = Object.fromEntries(formData.entries());
		console.log('Form submitted:', formValues);
		alert('Message sent successfully!');
		(event.target as HTMLFormElement).reset();
	}
</script>

{#if visible}
	<div in:fade={{ duration: 300 }}>
		<h1 class="text-4xl font-bold mb-4">Contact Us</h1>
		<p class="mb-4">Get in touch with us for any inquiries or support.</p>

		<div class="flex flex-col md:flex-row md:space-x-8">
			<div class="mb-8 md:w-1/2">
				<h2 class="text-2xl font-semibold mb-4">Send us a message</h2>
				<form on:submit={handleSubmit} class="space-y-4">
					<div>
						<label for="name" class="block mb-1">Name:</label>
						<input type="text" id="name" name="name" required class="w-full p-2 border rounded" />
					</div>
					<div>
						<label for="email" class="block mb-1">Email:</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="w-full p-2 border rounded"
						/>
					</div>
					<div>
						<label for="message" class="block mb-1">Message:</label>
						<textarea id="message" name="message" required class="w-full p-2 border rounded h-32"
						></textarea>
					</div>
					<button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
						>Send Message</button
					>
				</form>

				<div class="mt-8">
					<h2 class="text-2xl font-semibold mb-2">Contact Information</h2>

					<p>Telefon: (064) 8225700</p>
					<p>Adresa: Granični put Preljina-Baluga Lj. 16, 32212 Čačak</p>
				</div>
			</div>

			<div class="mb-8 md:w-1/2">
				<h2 class="text-2xl font-semibold mb-4">Our Location</h2>
				<GoogleMap lat={businessLocation.lat} lng={businessLocation.lng} />
			</div>
		</div>
	</div>
{/if}

<style>
	/* Add any additional styles here */
</style>
