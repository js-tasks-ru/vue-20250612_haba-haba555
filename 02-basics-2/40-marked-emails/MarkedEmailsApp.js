import { computed, defineComponent, ref } from 'vue';

// Значения взяты из https://jsonplaceholder.typicode.com/comments
export const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

export default defineComponent({
  name: 'MarkedEmailsApp',

  setup() {
    const searchQuery = ref('');

    const emailList = computed(() => {
      return emails.map(email => {
        return {
          title: email,
          isMarked: !!(searchQuery.value && email.toLowerCase().includes(searchQuery.value.toLowerCase())),
        }
      });
    });

    return {
      emailList,
      searchQuery,
    }
  },

  template: `
    <div>
      <div class="form-group">
        <input v-model="searchQuery" type="search" aria-label="Search" />
      </div>
      <ul aria-label="Emails">
        <li
          v-for="(email, index) in emailList"
          :key="index"
          :class="{ 'marked': email.isMarked }"
        >
          {{ email.title }}
        </li>
      </ul>
    </div>
  `,
})
