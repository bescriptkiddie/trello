<template>
    <div id="register-login">
        <a class="logo" href="/"></a>

        <div class="section-wrapper">
            <div class="account-form">
                <h1>登录到 Trello</h1>
                <form id="register-form" method="POST">
                    <div>
                        <label>
                            <input class="form-field" autofocus="autofocus" placeholder="输入用户名" />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="password" class="form-field" placeholder="输入密码" />
                        </label>
                    </div>
                    <div class="register-div">
                        <input type="submit" class="btn btn-success" value="登录" />
                        <router-link :to="{name:'Register'}" class="btn" type="button">注册</router-link>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
    };
</script>

<style scoped>

</style>
