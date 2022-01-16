import {remScale} from '@lib/themes/utils';

const ThemeStyles = {
  navbar: {
    zIndex: 50,
    paddingHorizontal: remScale(3),
  },
  h1: {
    fontSize: 40,
    fontWeight: '700',
  },
  h2: {
    fontSize: 32,
    fontWeight: '600',
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
  },
  h6: {
    fontSize: 16,
    fontWeight: '600',
  },
  b1: {
    fontSize: 18,
    fontWeight: '500',
  },
  b2: {
    fontSize: 16,
  },
  b3: {
    fontSize: 14,
  },
  b4: {
    fontSize: 12,
  },
  btn: {
    padding: remScale(2),
    borderRadius: 12,
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
    borderRadius: 12,
  },
  form_leading: {
    minWidth: remScale(5),
  },
  form_leading_icon: {
    size: remScale(3),
  },
  form_trailing: {
    minWidth: remScale(5),
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
    width: remScale(4),
  },
  checkBoxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: remScale(2.5),
    height: remScale(2.5),
    borderRadius: remScale(3),
    borderWidth: 1,
    marginRight: remScale(1),
  },
  checkBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: remScale(2.5),
    height: remScale(2.5),
    borderRadius: remScale(2.5),
  },
  checkBoxTextContainer: {
    flexShrink: 1,
    paddingLeft: remScale(2.5 + 1),
  },
  checkBoxText: {
    marginTop: 0,
    lineHeight: remScale(2 + 0.5),
    fontSize: remScale(2),
  },
};

export default ThemeStyles;
