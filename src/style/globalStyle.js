import { Dimensions, Platform } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const blue = '#065ca9'
const red = 'red'
const orange = '#ff8000'
const lightGray = '#989898'

const fontFamily = 'Roboto'

module.exports = {
  blue,
  red,
  orange,
  lightGray,
  fontFamily,

  fill: { flex: 1, backgroundColor: 'white' },
  fillLightGray: { flex: 1, backgroundColor: '#f1f1f1' },

  overlayModal: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 20,
    minWidth: width - 20,
    minHeight: height / 2,
    borderRadius: 15,
    justifyContent: 'center',
  },
}