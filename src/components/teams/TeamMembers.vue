<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for='member in members'
        :key='member.id'
        :name='member.fullName'
        :role='member.role'
      ></user-item>
    </ul>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  props: ['teamId'],
  components: {
    UserItem
  },
  data() {
    return {
      members: [],
      teamName: ''
    };
  },
  methods: {
    loadTeamMembers(teamId) {
      this.members = [];
      const { name, members } = this.teams.find(({ id }) => id === teamId);
      this.teamName = name;
      members.forEach((memberId) => {
        const neededUser = this.users.find(({ id }) => id === memberId);
        this.members.push(neededUser);
      });
    }
  },
  created() {
    this.loadTeamMembers(this.teamId);
    console.log(this.$route.query);
  },
  watch: {
    teamId(newId) {
      this.loadTeamMembers(newId);
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
