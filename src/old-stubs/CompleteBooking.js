import React, { Component, Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Redirect, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { completeBooking } from "../../redux/actions/celebrities";
import { useTranslation } from "react-i18next";
import Loader from "../common/Loader";
import axios from "axios";

function usePipe() {
  let [loadedScript, setLoadedScript] = useState(false);

  useEffect(() => {
    initializePipe();
  }, []);

  const markPengCompleted = booking_id => {
    axios
      .get(`/api/v1/booking/${booking_id}/complete`)
      .then(res => {
        let booking = res.data;
        console.log(booking);
        setPeng(booking);
      })
      .then(() => setPending(false))
      .catch(err => {
        //   dispatch({type: GET_CELEB_ERROR, payload: err})
        // dispatch(returnErrors(err.response.data, err.response.status))
      });
  };

  function initializePipe() {
    if (!loadedScript) {
      let addpipeCSS = document.createElement("link");
      addpipeCSS.rel = "stylesheet";
      addpipeCSS.href = "https://cdn.addpipe.com/2.0/pipe.css";
      let addpipeJS = document.createElement("script");
      addpipeJS.src = "https://cdn.addpipe.com/2.0/pipe.js";
      document.body.appendChild(addpipeCSS);
      document.body.appendChild(addpipeJS);
    }
    setLoadedScript(true);
  }

  function onLoadPipe(peng, callback) {
    if (loadedScript) {
      var pipeParams = {
        size: {
          width: 640,
          height: 390
        },
        qualityurl: "avq/720p.xml",
        accountHash: "d2f1c9e06f6ce047bc3ddffe535eeb43",
        eid: "PtRWYL",
        sis: 1,
        asv: 0,
        payload: `"{'type': 'booking', 'id': '${peng.uuid}'}"`,
        st: 1,
        showMenu: 1,
        mrt: 120
      };

      PipeSDK.insert("peng-video", pipeParams, function(myRecorder) {
        myRecorder.onReadyToRecord = function(id, type) {
          // $('document').on('recorder.record', function () {
          //     myRecorder.record();
          // })
          // $('document').on('recorder.stop', function () {
          //     myRecorder.stopVideo();
          // })
          // $('document').on('recorder.save', function () {
          //     myRecorder.save();
          // })
          // TODO
          // handle after recording saved (save video, associate video to booking) - done
          // webhook after processed - done
          // email for order processed - done
          // change url for video recorder - thus (ensure only celebrities corresponding to celebrities booking are shown)
          // a separate page for booking
          // add list of videos to get video api
        };

        myRecorder.onSaveOk = function(
          recorderId,
          streamName,
          streamDuration,
          cameraName,
          micName,
          audioCodec,
          videoCodec,
          fileType,
          videoId,
          audioOnly,
          location
        ) {
          var args = Array.prototype.slice.call(arguments);
          console.log("onSaveOk(" + args.join(", ") + ")");
          myRecorder.remove();
          callback();

          // make call to mark completed
          let msg = $(".peng-record-message").text();
          $(".peng-record-message").html(
            `Peng for ${
              peng.order_to
            } has been saved. Would be ready for viewing in a bit...`
          );
          $(".peng-record-message").css({ color: "black" });
          $(".peng-button").removeClass("displayNone");
          $(".peng-button").css({ position: "absolute" });
        };
      });
    }
  }
  return [loadedScript, onLoadPipe];
}

export function CompleteBooking(props) {
  console.log(props);
  let {
    match: {
      params: { booking_id }
    }
  } = props;
  let [pending, setPending] = useState(true);
  let [peng, setPeng] = useState({});
  let [btnClass, setBtnClass] = useState("idle");
  const { t, i18n } = useTranslation();
  let [loadedScript, onLoadPipe] = usePipe(false);

  const history = useHistory();

  const getPeng = booking_id => {
    axios
      .get("/api/v1/peng/" + booking_id)
      .then(res => {
        let booking = res.data;
        console.log(booking);
        setPeng(booking);
      })
      .then(() => setPending(false))
      .catch(err => {
        //   dispatch({type: GET_CELEB_ERROR, payload: err})
        // dispatch(returnErrors(err.response.data, err.response.status))
      });
  };

  useEffect(() => {
    if (pending) {
      // Get Peng
      getPeng(booking_id);
    }
  }, [pending]);

  const record = React.createRef();
  const save = React.createRef();

  const markComplete = () => {
    let { user } = props.auth;
    let slug_url = !!user && !!user.public ? user.public.slug_url : null;
    if (!!slug_url) {
      props.completeBooking(slug_url, booking_id);
    }
  };

  const toggleClass = () => {
    const $record = $(record);
    if (btnClass === "idle") {
      setBtnClass("stop");
      // $('#pipeRec-peng-video[title="record"]').trigger('click')
      // $('#pipeRec-peng-video[title="stop"]').trigger('click')
      $record.trigger("recorder.record");
      return;
    }
    if (btnClass === "stop") {
      // $('#pipeRec-peng-video[title="stop"]').trigger('click', function (){
      //     $('#pipePlay-peng-video[title="play"]').trigger('click')
      // })
      $record.trigger("recorder.stop");
      setBtnClass("save");
      return;
    }
    if (btnClass === "save") {
      setBtnClass("idle");
    }
  };

  const handleSave = () => {
    const $save = $(save);
    $save.trigger("recorder.save");
  };

  if (pending) return <Loader />;

  let title = `Peng for ${peng.order_to} ${
    !!peng.order_from ? `from ${peng.order_from}` : ""
  }`;
  let description = `${title} | Peng - meeting celebrities`;

  if (peng.completed) return <Redirect to="/bookings" />;

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
                <h2>{title}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="artist_wrapper m24_cover">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-20 mb-20 ">
              <div id="peng-video-container">
                <div id="peng-video" className="justify-content-md-center">
                  {!!loadedScript && onLoadPipe(peng, markComplete)}
                </div>
                {loadedScript && (
                  <Fragment>
                    <div className={`peng-record-message`}>{peng.message}</div>
                    <button
                      type="button"
                      className={`btn btn-success peng-button displayNone`}
                      onClick={() => {
                        history.push("/bookings");
                      }}
                    >
                      View Bookings
                    </button>

                    {/* { <div className={`peng-record-button ${btnClass}`} onClick={toggleClass} ref={record}>
                                            <div className="peng-record-action"></div>
                                        </div> }
                                        { <button type="button" onClick={handleSave} className={`btn btn-success peng-video-save ${btnClass}`} ref={save}>Save</button> }
                                        { <span className={`peng-video-cancel ${btnClass}`} onClick={toggleClass}> <i className="fas fa-times"></i> </span> } */}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { completeBooking }
)(CompleteBooking);
