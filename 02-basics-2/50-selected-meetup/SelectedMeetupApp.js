import {defineComponent, onBeforeMount, ref, watch} from 'vue';
import { getMeetup } from './meetupsService.ts';

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const currentMeetup = ref(null);
    const currentMeetupId = ref(1);

    const getCurrentMeetup = async (meetupId) => {
      try {
        currentMeetup.value = await getMeetup(meetupId);
      } catch (error) {
        console.error(error);
      }
    }

    const handlePrevClick = () => currentMeetupId.value -= 1;

    const handleNextClick = () => currentMeetupId.value += 1;

    watch(currentMeetupId, async (value) => await getCurrentMeetup(value));

    onBeforeMount(async () => await getCurrentMeetup(currentMeetupId.value));

    return {
      currentMeetup,
      currentMeetupId,
      handlePrevClick,
      handleNextClick,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          :disabled="currentMeetupId === 1"
          @click="handlePrevClick"
        >
          Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              v-model="currentMeetupId"
              id="meetup-id-1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="1"
            />
            <label for="meetup-id-1" class="radio-group__label">1</label>
          </div>
          <div class="radio-group__button">
            <input
              v-model="currentMeetupId"
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="2"
            />
            <label for="meetup-id-2" class="radio-group__label">2</label>
          </div>
          <div class="radio-group__button">
            <input
              v-model="currentMeetupId"
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="3"
            />
            <label for="meetup-id-3" class="radio-group__label">3</label>
          </div>
          <div class="radio-group__button">
            <input
              v-model="currentMeetupId"
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="4"
            />
            <label for="meetup-id-4" class="radio-group__label">4</label>
          </div>
          <div class="radio-group__button">
            <input
              v-model="currentMeetupId"
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="5"
            />
            <label for="meetup-id-5" class="radio-group__label">5</label>
          </div>
        </div>

        <button
          class="button button--secondary"
          type="button"
          :disabled="currentMeetupId === 5"
          @click="handleNextClick()"
        >
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ currentMeetup?.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
