import {Platform} from 'react-native';
import merge from 'lodash/merge';

export const fontWeight = (weight, italic = false) => {
  switch (weight) {
    case '100':
      return Platform.OS === 'ios'
        ? merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          )
        : {fontFamily: 'Nunito_Hairline', fontWeight: weight};
    case '200':
      return Platform.OS === 'ios'
        ? merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          )
        : merge(
            {fontFamily: 'Nunito-ExtraLight', fontWeight: weight},
            italic && {fontFamily: 'Nunito-ExtraLightItalic'},
          );
    case '300':
      return Platform.OS === 'ios'
        ? merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          )
        : merge(
            {fontFamily: 'Nunito-Light', fontWeight: weight},
            italic && {fontFamily: 'Nunito-LightItalic'},
          );
    case '400':
      return Platform.OS === 'ios'
        ? merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          )
        : merge(
            {fontFamily: 'Nunito-Regular', fontWeight: weight},
            italic && {fontFamily: 'Nunito-Italic'},
          );
    case '500':
      return Platform.OS === 'ios'
        ? merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          )
        : merge(
            {fontFamily: 'Nunito-Medium', fontWeight: weight},
            italic && {fontFamily: 'Nunito-MediumItalic'},
          );
    case '600':
      return Platform.OS === 'ios'
        ? merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          )
        : merge(
            {fontFamily: 'Nunito-SemiBold', fontWeight: weight},
            italic && {fontFamily: 'Nunito-SemiBoldItalic'},
          );
    case '700':
      return Platform.OS === 'ios'
        ? merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          )
        : merge(
            {fontFamily: 'Nunito-Bold', fontWeight: weight},
            italic && {fontFamily: 'Nunito-BoldItalic'},
          );
    case '800':
      return Platform.OS === 'ios'
        ? merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          )
        : merge(
            {fontFamily: 'Nunito-ExtraBold', fontWeight: weight},
            italic && {fontFamily: 'Nunito-ExtraBoldItalic'},
          );
    case '900':
      return Platform.OS === 'ios'
        ? merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          )
        : merge(
            {fontFamily: 'Nunito-Black', fontWeight: weight},
            italic && {fontFamily: 'Nunito-BlackItalic'},
          );
  }
};
