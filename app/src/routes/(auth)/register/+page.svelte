<script>
    export let form
</script>

<h1>Register screen</h1>
<form method="POST" action="?/register">
	<label>
		Email
		<input name="email" type="email">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Register</button>
</form>