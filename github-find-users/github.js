class GitHub {
	constructor() {
		this.client_id = 'a4125807aca99f73a48c';
		this.client_secret = 'e7902f25ade2fc5d6b82b7c12e230d3bfb49c626';
		this.repos_count = 5;
		this.repos_sort = 'created: asc';
	}

	async getUser(user) {
		const profileResponse = await fetch(
			`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
		);

		const repoResponse = await fetch(
			`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
		);

		const profileData = await profileResponse.json();
		const repos = await repoResponse.json();

		return {
			profile: profileData,
			repos
		};
	}
}
