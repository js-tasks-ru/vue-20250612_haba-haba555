import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    const pinPositionStyles = reactive({
      left: '0px',
      top: '0px',
    });

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      pinPositionStyles.left = event.offsetX + 'px';
      pinPositionStyles.top = event.offsetY + 'px';
    }

    return {
      pinPositionStyles,
      handleClick,
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <span class="pin" :style="pinPositionStyles">📍</span>
    </div>
  `,
})
