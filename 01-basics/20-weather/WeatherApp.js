import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherCards = getWeatherData();

    const isNightCard = (currentValue, sunriseValue, sunsetValue) => {
      const [currentHours, currentMinutes] = currentValue.split(':');
      const [sunriseHours, sunriseMinutes] = sunriseValue.split(':');
      const [sunsetHours, sunsetMinutes] = sunsetValue.split(':');

      const totalCurrentMinutes = currentHours * 60 + currentMinutes;
      const totalSunriseMinutes = sunriseHours * 60 + sunriseMinutes;
      const totalSunsetMinutes = sunsetHours * 60 + sunsetMinutes;

      return totalCurrentMinutes < totalSunriseMinutes && totalCurrentMinutes > totalSunsetMinutes;
    };

    const getWeatherIcon = id => WeatherConditionIcons[id];

    const formatTemperature = value => (value - 273.15).toFixed(1);

    const formatPressure = value => (value * 0.75).toFixed(0);

    return {
      weatherCards,
      isNightCard,
      getWeatherIcon,
      formatTemperature,
      formatPressure,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <ul class="weather-list unstyled-list">
        <li v-for="weatherCard in weatherCards"
            class="weather-card"
            :class="{ 'weather-card--night': isNightCard(weatherCard.current.dt, weatherCard.current.sunrise, weatherCard.current.sunset) }">
          <div v-if="weatherCard.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weatherCard.alert.sender_name }}: {{ weatherCard.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weatherCard.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weatherCard.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weatherCard.current.weather.description">{{ getWeatherIcon(weatherCard.current.weather.id) }}</div>
            <div class="weather-conditions__temp">{{ formatTemperature(weatherCard.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ formatPressure(weatherCard.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherCard.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherCard.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherCard.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
