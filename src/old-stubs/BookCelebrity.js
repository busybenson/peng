import React, { Component, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { logout } from "../../redux/actions/auth";
import {
  getCelebritiesError,
  getCelebrities,
  getCelebritiesPending
} from "../../redux/reducers/celebrities";
import Loader from "../common/Loader";
import {
  getCelebrity,
  verifyBooking,
  addBooking
} from "../../redux/actions/celebrities";
import CelebrityList from "./CelebrityList";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import formatPrice from "../common/NumberFormatter";

import * as yup from "yup";

function usePaystack() {
  let [loadedScript, setLoadedScript] = useState(false);
  const history = useHistory();

  useEffect(() => {
    initializePaymentScript();
  }, []);

  function initializePaymentScript() {
    let result = window.PaystackPop;
    if (!!result === false) {
      let ravepay = document.createElement("script");
      ravepay.src = "https://js.paystack.co/v1/inline.js";
      document.body.appendChild(ravepay);
    }
    setLoadedScript(true);
  }

  function onPay(res) {
    if (loadedScript) {
      let handler = window.PaystackPop.setup({
        key: "pk_test_490ce2e9315aa9f950a80ed80258c335c9318e36",
        email: res.booking.email,
        amount: res.amount,
        ref: res.payment.data.reference,
        metadata: res.booking,
        callback: response => {
          // verify transaction
          if (response.status == "success") {
            history.push(`/peng/${response.reference}`);
          }
        },
        onClose: () => {
          // do something
        }
        // currency: payStackState.currency,
        // plan: payStackState.plan || "",
        // quantity: payStackState.quantity || "",
        // subaccount: payStackState.subaccount || "",
        // transaction_charge: payStackState.transaction_charge || 0,
        // bearer: payStackState.bearer || "",
      });
      handler.openIframe();
    }
  }
  return [loadedScript, onPay];
}

export function BookCelebrity({
  auth,
  logout,
  celebrities,
  getCelebrities,
  ...props
}) {
  let {
    match: {
      params: { celeb }
    }
  } = props;
  let [pending, setPending] = useState(false);
  const { t, i18n } = useTranslation();

  let [formState, setFormState] = useState({
    personal_booking: false,
    order_from: "",
    order_to: "",
    email: "",
    phone: "",
    message: "",
    private_order: false
  });
  let currency = "NGN"; //todo get currency from state
  let [loadedScript, onPay] = usePaystack();

  const intl = props.intl;
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let BookingSchema = yup.object().shape({
    personal_booking: yup
      .string()
      .required()
      .label(`${t(`Booking.booking_details`)}`),
    order_from: yup
      .string()
      .when("personal_booking", {
        is: "false",
        then: yup.string().required()
      })
      .label(`${t(`Booking.order_from`)}`),
    order_to: yup
      .string()
      .required()
      .label(`${t(`Booking.order_to`)}`),
    email: yup
      .string()
      .email()
      .required()
      .label(`${t(`Booking.email`)}`),
    phone: yup
      .string()
      .label(`${t(`Booking.phone_number`)}`)
      .matches(phoneRegExp, `${t(`Booking.phone_validation`)}`),
    message: yup
      .string()
      .required()
      .label(`${t(`Booking.instructions`)}`)
  });

  useEffect(() => {
    if (!!celebrities && !celebrities.hasOwnProperty(celeb)) {
      props.getCelebrity(celeb);
    }
  }, [celeb]);

  const formik = useFormik({
    initialValues: {
      personal_booking: "false",
      order_from: "",
      order_to: "",
      email: "",
      phone: "",
      message: "",
      private_order: false
    },
    validationSchema: BookingSchema,

    onSubmit: values => {
      let newBooking = Object.assign(values, {
        personal_booking: values.personal_booking === "true"
      });
      props.addBooking(celeb, newBooking).then(res => {
        onPay(res);
      });
    }
  });

  const handleChange = key => event => {
    if (key == "personal_booking") {
      setFormState({
        ...formState,
        personal_booking: event.target.value == "true"
      });
    } else if (key == "private_order") {
      setFormState({ ...formState, private_order: event.target.checked });
    } else {
      setFormState({ ...formState, [key]: event.target.value });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.addBooking(celeb, formState).then(res => {
      onPay(res);
    });
  };
  // const { isAuthenticated, user } = this.props.auth;

  let celebrity =
    !!celebrities && celebrities.hasOwnProperty(celeb)
      ? celebrities[celeb]
      : [];
  if (pending) return <Loader />;
  let name = !!celebrity.nickname ? celebrity.nickname : "Name";
  let title = `${name} | Peng`;
  let description = `${name} | Peng - meeting celebrities`;

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="celebrity,gifts,peng" />
      </Helmet>
      <div className="indx_title_main_wrapper">
        <div className="title_img_overlay" />
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="indx_title_left_wrapper m24_cover">
                <h2>{`${t(`Booking.book`)} ${celebrity.nickname}`}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="artist_wrapper m24_cover">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-md-12 col-sm-12 col-12">
              <form className="booking-form" onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="m24_heading_wrapper m24_cover">
                      <h1>{t(`Booking.booking_details`)}</h1>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-pos">
                      <div className="form-group button_radio">
                        <fieldset>
                          <legend>{t(`Booking.booking_for`)}</legend>
                          <div className="switch-field">
                            <input
                              type="radio"
                              name="personal_booking"
                              id="personal_booking_gift"
                              className="radio"
                              value="false"
                              checked={
                                formik.values.personal_booking === "false"
                              }
                              onChange={formik.handleChange}
                            />
                            <label htmlFor="personal_booking_gift">
                              {t(`Booking.someone_else`)}
                            </label>
                            <input
                              type="radio"
                              name="personal_booking"
                              id="personal_booking_self"
                              className="radio"
                              value="true"
                              checked={
                                formik.values.personal_booking === "true"
                              }
                              onChange={formik.handleChange}
                            />
                            <label htmlFor="personal_booking_self">
                              {t(`Booking.myself`)}
                            </label>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className={
                      formik.values.personal_booking == "true"
                        ? "col-lg-12 col-md-12"
                        : "col-lg-6 col-md-6"
                    }
                  >
                    <div className="form-pos">
                      <div className="form-group i-name">
                        <label htmlFor="order_to">
                          {t(`Booking.order_to`)}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="order_to"
                          placeholder="Dolapo"
                          value={formik.values.order_to}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.order_to && formik.touched.order_to ? (
                          <div>{formik.errors.order_to}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {formik.values.personal_booking == "false" && (
                    <div className="col-lg-6 col-md-6">
                      <div className="form-pos">
                        <div className="form-group i-name">
                          <label htmlFor="order_from">
                            {t(`Booking.order_from`)}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="order_from"
                            placeholder="Moyo"
                            value={formik.values.order_from}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.order_from &&
                          formik.touched.order_from ? (
                            <div>{formik.errors.order_from}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-e">
                      <div className="form-group i-email">
                        <label htmlFor="last_name">{t(`Booking.email`)}</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="myemail@example.com"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email ? (
                          <div>{formik.errors.email}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-e">
                      <div className="form-group">
                        <label htmlFor="last_name">
                          {t(`Booking.phone_number`)}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="+234 802 123 4567"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.phone && formik.touched.phone ? (
                          <div>{formik.errors.phone}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-m">
                      <div className="form-group">
                        <label htmlFor="message">
                          {t(`Booking.instructions_for`, {
                            name: celebrity.nickname
                          })}
                        </label>
                        <textarea
                          className="form-control require"
                          name="message"
                          required=""
                          rows="5"
                          id="message"
                          value={formik.values.message}
                          onChange={formik.handleChange}
                          placeholder={t(`Booking.message_placeholder`)}
                        />
                        {formik.errors.message && formik.touched.message ? (
                          <div>{formik.errors.message}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-pos">
                      <div className="form-group">
                        <label
                          className="styled-checkbox"
                          htmlFor="private_order"
                        >
                          <input
                            type="checkbox"
                            name="private_order"
                            id="private_order"
                            value="false"
                            checked={formik.values.private_order}
                            onChange={formik.handleChange}
                          />
                          <span>{t(`Booking.private_order`)}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="tb_es_btn_div">
                      <div className="response" />
                      <div className="styled-button">
                        <button type="submit" className="submitForm">
                          <i className="flaticon-play-button" />{" "}
                          {t(`Booking.book_now`)}{" "}
                          <span className={`currency currency_${currency}`}>
                            {formatPrice(celebrity.price, true)}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>{" "}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    celebrities: state.celebrities.celebrities,
    pending: state.celebrities.pending
  };
};

export default connect(
  mapStateToProps,
  { getCelebrity, verifyBooking, addBooking }
)(BookCelebrity);
