<script>
    export let form
</script>

<div class="flex justify-center align-middle my-auto">
	<div class="border-2 border-green-400 rounded-lg p-5 px-10 bg-slate-900 w-1/3">
		<h1 class="text-3xl text-green-400">Login</h1>
		<form method="POST" action="?/login" class="flex flex-col">
			<input name="email" type="email" placeholder="Email" 
			class="transition-all focus:border-2 hover:border-2 focus:outline-none
			 rounded-md border-b-2 mt-6 px-4 py-2   bg-slate-900 border-1 border-green-400">

			<input name="password" type="password" placeholder="Password" 
			class="transition-all focus:border-2 hover:border-2 focus:outline-none
			rounded-md border-b-2 mt-6 px-4 py-2   bg-slate-900 border-1 border-green-400">

			<button class="text-slate-100 border-1 border-green-400 bg-slate-800 mt-6 py-2">Login</button>
		</form>
	</div>
	
</div>
