<script>
    export let form
</script>

<h1>Login screen</h1>
<form method="POST" action="?/login">
	<label>
		Email
		<input name="email" type="email">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Login</button>
</form>