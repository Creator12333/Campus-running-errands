
Component({
  properties: {
      title: {
          type: String,
          value: '提示',
      },
      content: {
          type: String,
          value: '',
      }
  },
  methods: {
      cancel() {
          this.triggerEvent('cancel');
      },
      submit() {
          this.triggerEvent('submit', 'Code程序人生');
      }
  }
})