<script>
    let name = 'Klementev Timofey';
</script>


<div class="block profile-block">
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
</style>