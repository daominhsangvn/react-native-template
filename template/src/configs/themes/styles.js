import {remScale} from '@lib/themes/utils';

const ThemeStyles = {
  navbar: {
    zIndex: 50,
    paddingHorizontal: remScale(3),
  },
  h1: {
    fontSize: remScale(5),
    fontWeight: '700',
  },
  h2: {
    fontSize: remScale(4),
    fontWeight: '600',
  },
  h3: {
    fontSize: remScale(3),
    fontWeight: '600',
  },
  h4: {
    fontSize: remScale(2.5),
    fontWeight: '600',
  },
  h5: {
    fontSize: remScale(2.25),
    fontWeight: '600',
  },
  h6: {
    fontSize: remScale(2),
    fontWeight: '600',
  },
  b1: {
    fontSize: remScale(2.25),
    fontWeight: '500',
  },
  b2: {
    fontSize: remScale(2),
  },
  b3: {
    fontSize: remScale(1.75),
  },
  b4: {
    fontSize: remScale(1.5),
  },
  btn: {
    padding: remScale(2),
    borderRadius: remScale(1.5),
    borderWidth: 1,
    height: remScale(7),
  },
  btn_text: {
    fontWeight: '600',
    color: 'white',
  },
  btn_link: {
    fontWeight: '500',
  },
  form_field: {
    borderWidth: 1,
    borderRadius: remScale(1.5),
  },
  form_leading: {
    minWidth: remScale(6),
    // paddingHorizontal: remScale(2),
  },
  form_leading_icon: {
    size: remScale(3),
  },
  form_trailing: {
    minWidth: remScale(6),
  },
  form_trailing_icon: {
    size: remScale(3),
  },
  form_error_message: {
    fontSize: remScale(1.5),
  },
  form_error_container: {
    paddingHorizontal: remScale(2),
  },
  input: {
    height: 50,
    fontSize: remScale(2),
  },
  input_clear_btn: {
    height: 50,
    width: remScale(4),
  },
  input_secure_onoff_btn: {
    width: remScale(3.2),
  },
  checkBoxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: remScale(3),
    height: remScale(3),
    borderRadius: remScale(1),
    marginRight: remScale(1),
    overflow: 'hidden',
  },
  checkBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: remScale(3),
    height: remScale(3),
    borderRadius: remScale(1),
  },
  checkBoxTextContainer: {
    flexShrink: 1,
    paddingLeft: remScale(2.5 + 1),
  },
  checkBoxText: {
    marginTop: 1,
    lineHeight: remScale(2 + 0.5),
    fontSize: remScale(2),
  },
  switchCircle: {
    borderColor: 'white',
  },
  switchText: {
    marginTop: 3,
    lineHeight: remScale(2 + 0.5),
    fontSize: remScale(2),
  },
};

export default ThemeStyles;
