<template>
    <div class="border-2 rounded w-1/2 mx-auto">
        <h1 class="text-center">Create Quiz</h1>
        <form>
            <div>
                <label for="title" class="text-blue-darker pr-2">Quiz Title</label>
                <input type="text" name="title" id="title" v-model="quiz.title" class="border-blue-lighter border-b-2 pl-2">
            </div>
            <div>
                <label for="description" class="text-blue-darker pr-2">Description</label>
                <input type="text" name="description" id="description" v-model="quiz.description" class="pl-2 border-b-2 border-blue-lighter">
            </div>
            <!-- <div>
                <label for="password" class="text-blue-darker pr-2">Password</label>
                <input type="text" name="password" id="password" v-model="password" class="pl-2 border-b-2 border-blue-lighter">
            </div> -->
            <!-- <label for="shopChoice" class="w-1/2 text-right pr-2">Choose a Shop to Join:</label>
            <select name="shopChoice" id="shopChoice" class="w-1/2" v-model="shopChoice">
                <option default>Choose a Shop:</option>
                <option v-for="operator in operators" :value="operator._id" :key="operator._id">{{ operator.name }}</option>
            </select>
            <label for="shopPassword" class="w-1/2 text-right pr-2">Shop Password:</label>
            <input type="text" name="shopPassword" id="shopPassword" v-model="shopPassword" class="w-1/2"> -->

            <button @click.prevent="submitRegister" class="border-2 rounded border-blue">Register</button>
        </form>
    </div>
</template>

