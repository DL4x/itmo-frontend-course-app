<script>
    const profile = {
        photo: "https://via.placeholder.com/150",
        name: "Иванов Иван Иванович",
        birthDate: "15.03.1990",
        age: 34,
        phone: "+7 (123) 456-78-90",
        city: "Москва",
        bio: "Frontend-разработчик с 5-летним опытом работы. Специализируюсь на Svelte, React и TypeScript. Увлечен созданием интуитивно понятных и производительных пользовательских интерфейсов.",
        links: {
        github: "https://github.com/username",
        telegram: "https://t.me/username",
        email: "mailto:user@example.com"
        }
    };
</script>

<div class="profile-block">
  <!-- Верхняя часть с фото и основными данными -->
  <div class="profile-header">
    <enhanced:img
            alt="Profile Photo"
            class="profile-photo"
            src="/src/images/profileImages/1.png"
            width="300px"
        />
    <div class="profile-info">
      <h1 class="profile-name">{profile.name}</h1>
      <div class="profile-birthdate">
        {profile.birthDate} <span class="age">({profile.age} лет)</span>
      </div>
      <div class="profile-contacts">
        <div class="contact-item">{profile.phone} | {profile.city}</div>
      </div>
    </div>
  </div>

  <!-- Блок "О себе" -->
  <div class="profile-bio">
    <p>{profile.bio}</p>
  </div>

  <!-- Социальные ссылки -->
  <div class="social-links">
    <a href={profile.links.github} target="_blank" class="social-link" aria-label="GitHub">
      <enhanced:img
            alt="Profile Photo"
            class="social-icon"
            src="/src/images/github.svg"
            width="24px"
            height="24px"
        />
    </a>
    
    <a href={profile.links.telegram} target="_blank" class="social-link" aria-label="Telegram">
      <enhanced:img
            alt="Profile Photo"
            class="social-icon"
            src="/src/images/twitter.svg"
            width="24px"
            height="24px"
        />
    </a>
    
    <a href={profile.links.email} class="social-link" aria-label="Email">
      <enhanced:img
            alt="Profile Photo"
            class="social-icon"
            src="/src/images/instagram.svg"
            width="24px"
            height="24px"
        />
    </a>
  </div>
</div>

<style>
  .profile-block {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .profile-header {
    display: flex;
    gap: 2rem;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .profile-photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #f0f4f8;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .profile-info {
    flex: 1;
  }

  .profile-name {
    font-size: 1.8rem;
    margin: 0 0 0.5rem 0;
    color: #1a202c;
  }

  .profile-birthdate {
    font-size: 1.1rem;
    color: #4a5568;
    margin-bottom: 1rem;
  }

  .age {
    color: #718096;
  }

  .profile-contacts {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    color: #2d3748;
  }

  .contact-icon {
    font-size: 1.2rem;
  }

  .profile-bio {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 8px;
    line-height: 1.6;
    color: #4a5568;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    padding: 1rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #f0f4f8;
    transition: all 0.3s ease;
  }

  .social-link:hover {
    transform: translateY(-3px);
    background: #e2e8f0;
  }

  .social-icon {
    width: 24px;
    height: 24px;
    color: #4a5568;
  }

  /* Адаптивность */
  @media (max-width: 768px) {
    .profile-header {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
    }
    
    .profile-contacts {
      align-items: center;
    }
    
    .profile-name {
      font-size: 1.5rem;
    }
  }
</style>

<!-- <div class="block profile-block">
    <div class="profile-content">
        <enhanced:img
            alt="Profile Photo"
            class="profile-image"
            src="/src/images/profileImages/1.png"
            width="300px"
        />
        <div class="profile-name">
            {name}
        </div>
    </div>
</div>

<style>
    .block {
        position: relative;
        /* background: #f0f0f0;
        border: 1px solid #ccc;
        padding: 10px; */
        box-sizing: border-box;
        min-width: 0;
        display: flex;
        flex-direction: column;
    }

    .profile-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .profile-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .profile-image {
        object-fit: cover;
        margin-bottom: 15px;
    }

    .profile-name {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 10px;
    }

    @media (max-width: 480px) {
        .profile-image {
            width: 80px;
            height: 80px;
        }
        .profile-name {
            font-size: 1rem;
        }
    }
</style> -->