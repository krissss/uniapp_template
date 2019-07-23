const enums = {
  user_sex: {
    0: '未知',
    1: '男',
    2: '女'
  },
}

let selectorItems = {}
let pickerRanges = {}

export default {
  getLabel(category, value) {
    return enums[category][value]
  },
  getValueFromIndex(category, index) {
    return Object.keys(enums[category])[index]
  },
  getPickerRange(category) {
    if (!pickerRanges[category]) {
      selectorItems[category] = Object.values(enums[category])
    }
    return selectorItems[category]
  },

  getSelectorItems(category) {
    if (!selectorItems[category]) {
      const categoryObj = enums[category]
      let items = []
      for (const value of Object.keys(categoryObj)) {
        items.push({label: categoryObj[value], value: value})
      }
      selectorItems[category] = items
    }
    return selectorItems[category]
  },
}
