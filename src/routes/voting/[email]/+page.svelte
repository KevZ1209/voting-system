<script>
	export let data;
	import { onMount } from 'svelte';

	onMount(() => {
		checkEmail();
		fetchInfo();
	});

	let hasSetUp = false;
	let votingOpened = true;
	let loading = true;
	let hasVoted = false;

	let all_participants = [];

	const voting_preferences = ['', '', '', ''];

	let formData = {
		email: data.email,
		name: '',
		project_name: '',
		is_presenting: ''
	};

	async function checkEmail() {
		const response = await fetch('../../api/email', {
			method: 'POST',
			body: JSON.stringify({ email: data.email }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const responseStatus = await response.json();

		if (responseStatus.email_exists) {
			hasSetUp = true;
		} else {
			hasSetUp = false;
		}

		loading = false;
	}

	async function submitInfo() {
		const response = await fetch('../../api/info', {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const responseStatus = await response.json();

		if (responseStatus === true) {
			hasSetUp = true;
		}
	}

	async function fetchInfo() {
		const response = await fetch('../../api/voting', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const responseStatus = await response.json();

		all_participants = responseStatus;
	}

	async function submitVote() {
		const response = await fetch('../../api/voting', {
			method: 'POST',
			body: JSON.stringify({ email: data.email, voting_preferences }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const responseStatus = await response.json();

		if (responseStatus) {
			hasVoted = true;
		}
	}
</script>

{#if loading}
	<h1 class="mx-auto max-w-lg text-center">LOADING...</h1>
{:else if !hasSetUp}
	<div class="mx-auto max-w-lg text-center">
		<h1 class="text-xl font-bold text-center m-10">Setting up your "Account"</h1>
		<div class="w-64 mx-auto">
			<!-- Textbox code copied from DaisyUI docs -->
			<label class="input input-bordered flex items-center gap-2">
				<input type="text" class="grow" placeholder="Name" bind:value={formData.name} />
			</label>
		</div>

		<h2 class="text-lg font-bold mt-10">Will you be presenting?</h2>
		<div class="max-w-xs mx-auto">
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">Yes! I'm ready to win!</span>
					<input
						bind:group={formData.is_presenting}
						type="radio"
						name="radio-10"
						class="radio checked:bg-blue-500"
						value="true"
					/>
				</label>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">No. I'm just here for the show</span>
					<input
						bind:group={formData.is_presenting}
						type="radio"
						name="radio-10"
						class="radio checked:bg-red-500"
						value="false"
					/>
				</label>
			</div>
		</div>

		{#if formData.is_presenting === 'true'}
			<div class="w-64 mx-auto">
				<label class="input input-bordered flex items-center gap-2 mt-2">
					<input
						type="text"
						class="grow"
						placeholder="Project Name"
						bind:value={formData.project_name}
					/>
				</label>
			</div>
		{/if}

		<button class="btn m-10" on:click={submitInfo}>Submit</button>
	</div>
{:else if votingOpened}
	<div class="mx-auto max-w-lg text-center">
		<h1 class="text-xl font-bold text-center m-10">Voting</h1>
		<p>1st place</p>
		<select class="select select-bordered w-full max-w-xs" bind:value={voting_preferences[0]}>
			<option disabled selected>None</option>
			{#each all_participants as participant}
				{#if participant.email !== data.email && participant.is_presenting === true}
					<option value={participant.email}>{participant.name} ({participant.project_name})</option>
				{/if}
			{/each}
		</select>
		<p>2nd place</p>
		<select class="select select-bordered w-full max-w-xs" bind:value={voting_preferences[1]}>
			<option disabled selected>None</option>
			{#each all_participants as participant}
				{#if participant.email !== data.email && participant.is_presenting === true}
					<option value={participant.email}>{participant.name} ({participant.project_name})</option>
				{/if}
			{/each}
		</select>
		<p>3rd place</p>
		<select class="select select-bordered w-full max-w-xs" bind:value={voting_preferences[2]}>
			<option disabled selected>None</option>
			{#each all_participants as participant}
				{#if participant.email !== data.email && participant.is_presenting === true}
					<option value={participant.email}>{participant.name} ({participant.project_name})</option>
				{/if}
			{/each}
		</select>
		<p>4th place</p>
		<select class="select select-bordered w-full max-w-xs" bind:value={voting_preferences[3]}>
			<option disabled selected>None</option>
			{#each all_participants as participant}
				{#if participant.email !== data.email && participant.is_presenting === true}
					<option value={participant.email}>{participant.name} ({participant.project_name})</option>
				{/if}
			{/each}
		</select>
		<br />
		<button class="btn m-10" on:click={submitVote}>Submit</button>
		{#if hasVoted}
			<p>You have voted! Feel free to edit and resubmit</p>
		{/if}
	</div>
{:else}
	<div class="mx-auto max-w-lg text-center">
		<h1 class="text-xl font-bold text-center m-10">Voting will open up soon!</h1>
	</div>
{/if}
