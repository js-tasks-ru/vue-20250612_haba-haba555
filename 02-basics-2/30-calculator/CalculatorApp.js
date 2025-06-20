import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0);
    const secondOperand = ref(0);
    const selectedOperator = ref('sum');

    const result = computed(() => {
      switch (selectedOperator.value) {
        case 'sum':
          return firstOperand.value + secondOperand.value;
        case 'subtract':
          return firstOperand.value - secondOperand.value;
        case 'multiply':
          return firstOperand.value * secondOperand.value;
        case 'divide':
          return firstOperand.value / secondOperand.value;
      }
    });

    return {
      firstOperand,
      secondOperand,
      selectedOperator,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input v-model="firstOperand" type="number" aria-label="First operand" />

      <div class="calculator__operators">
        <label>
          <input v-model="selectedOperator" type="radio" name="operator" value="sum"/>
          ➕
        </label>
        <label>
          <input v-model="selectedOperator" type="radio" name="operator" value="subtract"/>
          ➖
        </label>
        <label>
          <input v-model="selectedOperator" type="radio" name="operator" value="multiply"/>
          ✖
        </label>
        <label>
          <input v-model="selectedOperator" type="radio" name="operator" value="divide"/>
          ➗
        </label>
      </div>

      <input v-model="secondOperand" type="number" aria-label="Second operand" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
