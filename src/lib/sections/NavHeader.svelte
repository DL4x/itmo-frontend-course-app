<style>
    @media screen and (max-width: 1140px) {
        header {
            display: none;
        }
    }
    a {
        text-decoration: none;
        /*height: 48px;*/
        padding: 16px 20px;
        border-radius: 8px;

        font-family: inherit;
        font-size: 0.875rem;
        line-height: 1rem;

        color: #363E45;
        border: 1px solid #98A3AE7A;
        background-color: white;
    }

		header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    /*    height: 48px;*/
        padding: 24px 0;
				flex-direction: row;
    }

		nav {
        display: flex;
        gap: 8px;
    }
</style>

<header id="nav_header">
	<enhanced:img class="image" src="/src/images/logo.svg" alt="Some strange logo" width="40" height="40" />
	<nav>
		<a href="#about_me_section">About me</a>
		<a href="#education_section">Education</a>
		<a href="#work_experience_section">Work Experience</a>
		<a href="#personality_section">Personality</a>
		<a href="#contacts_section">Contacts</a>
	</nav>
</header>