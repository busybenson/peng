import React from "react";
const pengIcons = {
  heart: {
    path: (
      <svg
        fill="currentColor"
        style={{ enableBackground: "new 0 0 288.398 288.398" }}
      >
        <g>
          <path
            d="M144.2,275.566c-6.629,0-13.257-1.969-18.914-5.905c-22.776-15.848-63.715-45.583-81.988-66.667
		C13.758,168.908,0,135.452,0,97.706c0-46.799,38.074-84.873,84.874-84.873c22.57,0,43.743,8.976,59.325,24.196
		c15.582-15.221,36.755-24.196,59.325-24.196c46.8,0,84.874,38.074,84.874,84.873c0,37.746-13.758,71.202-43.298,105.288
		c-18.271,21.082-59.213,50.819-81.992,66.67C157.454,273.598,150.827,275.566,144.2,275.566z M84.874,52.833
		C60.131,52.833,40,72.962,40,97.706c0,27.566,10.653,52.698,33.526,79.091c10.687,12.332,36.941,33.596,70.673,57.281
		c33.732-23.688,59.988-44.952,70.673-57.281c22.873-26.393,33.526-51.524,33.526-79.091c0-24.743-20.131-44.873-44.874-44.873
		c-17.736,0-33.846,10.491-41.04,26.728c-3.205,7.233-10.373,11.897-18.285,11.897s-15.08-4.664-18.285-11.897
		C118.72,63.324,102.61,52.833,84.874,52.833z"
          />
        </g>
      </svg>
    ),
    viewBox: "0 0 288.398 288.398"
  },
  "full-star": {
    path: (
      <svg fill="currentColor" style={{ enableBackground: "new 0 0 612 612" }}>
        <g>
          <path
            d="M610.089,233.999c-4.591-14.132-16.807-24.432-31.512-26.568l-164.157-23.856l-73.414-148.75
		c-6.577-13.325-20.147-21.76-35.007-21.76c-14.86,0-28.43,8.435-35.005,21.76l-73.414,148.75L33.424,207.432
		c-14.705,2.136-26.921,12.436-31.512,26.568s-0.762,29.645,9.879,40.015l118.785,115.787l-28.043,163.495
		c-2.513,14.646,3.507,29.446,15.529,38.18s27.958,9.885,41.112,2.972l146.825-77.192l146.825,77.192
		c5.713,3.004,11.949,4.485,18.162,4.485c8.095,0,16.149-2.515,22.95-7.455c12.021-8.734,18.041-23.536,15.529-38.18
		l-28.041-163.495l118.785-115.789C610.851,263.642,614.68,248.129,610.089,233.999z"
          />
        </g>
      </svg>
    ),
    viewBox: "0 0 612 612"
  },
  receipt: {
    path: (
      <svg
        style={{ enableBackground: "new 0 0 60 60" }}
        fill="currentColor"
        strokeWidth={2}
      >
        <g id="IconsRepo_bgCarrier" />{" "}
        <path d="M60,4.293c0-2.206-1.794-4-4-4H4c-2.206,0-4,1.794-4,4c0,1.859,1.28,3.411,3,3.858v48.556l3-3l6,6l6-6l6,6l6-6l6,6l6-6l6,6 l6-6l3,3V8.151C58.72,7.704,60,6.152,60,4.293z M55,51.879l-1-1l-6,6l-6-6l-6,6l-6-6l-6,6l-6-6l-6,6l-6-6l-1,1V8.293v-3h50v3 V51.879z M57,6.024V3.293H3v2.731C2.403,5.679,2,5.032,2,4.293c0-1.103,0.897-2,2-2h52c1.103,0,2,0.897,2,2 C58,5.032,57.597,5.679,57,6.024z" />{" "}
        <path d="M44,40.293H29c-0.552,0-1,0.447-1,1s0.448,1,1,1h15c0.552,0,1-0.447,1-1S44.552,40.293,44,40.293z" />{" "}
        <path d="M48.29,40.583c-0.18,0.189-0.29,0.439-0.29,0.71c0,0.26,0.11,0.52,0.29,0.71c0.19,0.18,0.45,0.29,0.71,0.29 c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71c0-0.271-0.11-0.521-0.29-0.71C49.33,40.213,48.67,40.213,48.29,40.583z " />{" "}
        <path d="M49,26.293H34c-0.552,0-1,0.447-1,1s0.448,1,1,1h15c0.552,0,1-0.447,1-1S49.552,26.293,49,26.293z" />{" "}
        <path d="M49,33.293H39c-0.552,0-1,0.447-1,1s0.448,1,1,1h10c0.552,0,1-0.447,1-1S49.552,33.293,49,33.293z" />{" "}
        <path d="M28,34.293c0,0.553,0.448,1,1,1h2c0.552,0,1-0.447,1-1s-0.448-1-1-1h-2C28.448,33.293,28,33.74,28,34.293z" />{" "}
        <path d="M45,20.293c0-0.553-0.448-1-1-1H29c-0.552,0-1,0.447-1,1s0.448,1,1,1h15C44.552,21.293,45,20.846,45,20.293z" />{" "}
        <path d="M48.29,19.583c-0.18,0.189-0.29,0.439-0.29,0.71c0,0.26,0.11,0.52,0.29,0.71c0.19,0.18,0.45,0.29,0.71,0.29 c0.27,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71C49.34,19.213,48.66,19.213,48.29,19.583z" />{" "}
        <path d="M30.71,28.003c0.18-0.19,0.29-0.44,0.29-0.71c0-0.271-0.11-0.521-0.29-0.71c-0.37-0.37-1.04-0.37-1.42,0 c-0.18,0.189-0.29,0.439-0.29,0.71c0,0.27,0.11,0.52,0.29,0.71c0.19,0.18,0.45,0.29,0.71,0.29 C30.26,28.293,30.52,28.183,30.71,28.003z" />{" "}
        <path d="M35.71,35.003c0.18-0.19,0.29-0.44,0.29-0.71c0-0.271-0.11-0.53-0.29-0.71c-0.37-0.37-1.04-0.37-1.42,0 c-0.18,0.189-0.29,0.45-0.29,0.71s0.11,0.52,0.29,0.71c0.19,0.18,0.45,0.29,0.71,0.29C35.26,35.293,35.52,35.183,35.71,35.003z" />{" "}
        <path d="M17,21.394v-1.101c0-0.553-0.448-1-1-1s-1,0.447-1,1v1.104c-1.091,0.222-2.085,0.801-2.818,1.668 c-0.611,0.722-0.894,1.646-0.794,2.603c0.102,0.979,0.606,1.887,1.383,2.491L15,29.893v5.438c-1.161-0.414-2-1.514-2-2.816 c0-0.553-0.448-1-1-1s-1,0.447-1,1c0,2.414,1.721,4.434,4,4.899v0.878c0,0.553,0.448,1,1,1s1-0.447,1-1v-0.882 c1.091-0.222,2.085-0.801,2.819-1.668c0.611-0.724,0.893-1.648,0.793-2.605c-0.103-0.978-0.606-1.885-1.383-2.488L17,28.916v-5.438 c1.161,0.414,2,1.514,2,2.816c0,0.553,0.448,1,1,1s1-0.447,1-1C21,23.879,19.279,21.859,17,21.394z M18.001,32.228 c0.349,0.271,0.576,0.68,0.622,1.118c0.043,0.41-0.075,0.803-0.331,1.105c-0.348,0.411-0.798,0.699-1.292,0.875v-3.878 L18.001,32.228z M13.999,26.581c-0.35-0.272-0.576-0.681-0.622-1.12c-0.042-0.409,0.075-0.801,0.331-1.104 c0.348-0.411,0.798-0.699,1.292-0.875v3.877L13.999,26.581z" />{" "}
        <circle cx="40" cy="11.293" r="1" />{" "}
        <circle cx="36" cy="11.293" r="1" />{" "}
        <circle cx="44" cy="11.293" r="1" />{" "}
        <circle cx="32" cy="11.293" r="1" />{" "}
        <circle cx="48" cy="11.293" r="1" />{" "}
        <circle cx="20" cy="11.293" r="1" />{" "}
        <circle cx="24" cy="11.293" r="1" />{" "}
        <circle cx="28" cy="11.293" r="1" />{" "}
        <circle cx="52" cy="11.293" r="1" />{" "}
        <circle cx="16" cy="11.293" r="1" />{" "}
        <circle cx="12" cy="11.293" r="1" /> <circle cx="8" cy="11.293" r="1" />{" "}
      </svg>
    ),
    viewBox: "0 0 60 60"
  },
  "email-message": {
    path: (
      <svg style={{ enableBackground: "new 0 0 26 26" }} fill="currentColor">
        <g id="IconsRepo_bgCarrier" />{" "}
        <path d="M16.643,21c0,0.275-0.225,0.5-0.5,0.5h-13c-0.275,0-0.5-0.225-0.5-0.5V3c0-0.275,0.225-0.5,0.5-0.5h13 c0.275,0,0.5,0.225,0.5,0.5v3.454h1V2c0-1.1-0.9-2-2-2h-12c-1.1,0-2,0.9-2,2v22c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-4.454h-1V21z M8.643,0.923h2c0.275,0,0.5,0.159,0.5,0.354c0,0.195-0.225,0.354-0.5,0.354h-2c-0.275,0-0.5-0.159-0.5-0.354 C8.143,1.083,8.367,0.923,8.643,0.923z M4.143,0.778c0.275,0,0.5,0.224,0.5,0.5c0,0.276-0.225,0.5-0.5,0.5s-0.5-0.224-0.5-0.5 C3.643,1.002,3.867,0.778,4.143,0.778z M9.643,24.936c-0.659,0-1.193-0.533-1.193-1.192c0-0.66,0.534-1.194,1.193-1.194 c0.659,0,1.194,0.534,1.194,1.194C10.837,24.4,10.302,24.936,9.643,24.936z" />{" "}
        <path d="M6.996,9.287l6.697,3.348c1.009,0.504,2.89,0.504,3.897,0l6.697-3.348c-0.25-1.046-1.189-1.833-2.309-1.833H9.304 C8.186,7.454,7.245,8.241,6.996,9.287z" />{" "}
        <path d="M17.945,13.343c-0.62,0.31-1.438,0.48-2.303,0.48c-0.866,0-1.685-0.171-2.304-0.48l-1.852-0.926l-4.561,2.28v1.472 c0,1.308,1.07,2.377,2.377,2.377H21.98c1.308,0,2.377-1.069,2.377-2.377v-1.472l-4.562-2.279L17.945,13.343z" />{" "}
        <polygon points="20.683,11.975 24.357,13.812 24.357,10.138 " />{" "}
        <polygon points="6.927,13.812 10.602,11.975 6.927,10.138 " />{" "}
      </svg>
    ),
    viewBox: "0 0 26 26"
  },
  "empty-star": {
    path: (
      <svg
        fill="currentColor"
        style={{ enableBackground: "new 0 0 602.134 602.133" }}
      >
        <g>
          <g>
            <path
              d="M581.866,202.918c-8.435-7.418-18.818-12.2-30.028-13.829l-137.254-19.944L353.203,44.773
			c-5.014-10.158-12.771-18.557-22.432-24.286c-8.963-5.314-19.234-8.124-29.705-8.124s-20.743,2.809-29.705,8.124
			c-9.661,5.729-17.417,14.127-22.431,24.286l-61.381,124.373L50.296,189.089c-11.211,1.629-21.595,6.411-30.029,13.829
			c-7.824,6.881-13.669,15.782-16.905,25.741c-3.235,9.958-3.738,20.595-1.454,30.761c2.463,10.958,8.053,20.931,16.166,28.838
			l99.317,96.811L93.945,521.767c-2.905,16.939,1.758,34.161,12.794,47.252c11.118,13.188,27.34,20.751,44.506,20.751
			c9.349,0,18.706-2.321,27.059-6.713l122.763-64.54l122.763,64.54c8.353,4.392,17.709,6.713,27.058,6.713
			c17.166,0,33.388-7.563,44.507-20.751c11.036-13.091,15.699-30.312,12.794-47.252l-23.445-136.698l99.317-96.811
			c8.112-7.908,13.702-17.88,16.165-28.838c2.285-10.166,1.782-20.803-1.453-30.761C595.536,218.701,589.69,209.8,581.866,202.918z
			 M554.156,257.581L444.472,364.499c-3.606,3.515-5.252,8.579-4.4,13.542l25.893,150.969c1.696,9.89-6.162,17.921-15.077,17.921
			c-2.353,0-4.778-0.56-7.122-1.792l-135.578-71.277c-2.229-1.172-4.675-1.758-7.12-1.758s-4.891,0.586-7.12,1.758l-135.578,71.277
			c-2.343,1.232-4.771,1.792-7.123,1.792c-8.916,0-16.773-8.031-15.077-17.921l25.893-150.969c0.852-4.963-0.794-10.027-4.4-13.542
			L47.976,257.581c-9.081-8.851-4.07-24.273,8.479-26.097l151.582-22.026c4.983-0.724,9.291-3.854,11.52-8.37l67.79-137.356
			c2.806-5.686,8.263-8.529,13.72-8.529c5.458,0,10.914,2.844,13.719,8.529l67.79,137.356c2.229,4.515,6.536,7.646,11.52,8.37
			l151.581,22.026C558.227,233.308,563.237,248.73,554.156,257.581z"
            />
            <path
              d="M450.887,590.27c-9.43,0-18.866-2.341-27.29-6.771l-122.53-64.418L178.537,583.5c-8.425,4.43-17.862,6.771-27.292,6.771
			c-17.314,0-33.675-7.628-44.889-20.929c-11.131-13.203-15.834-30.574-12.904-47.659l23.401-136.438l-99.129-96.628
			c-8.182-7.975-13.819-18.033-16.304-29.086c-2.304-10.254-1.797-20.982,1.466-31.025c3.264-10.043,9.16-19.021,17.051-25.961
			c8.507-7.482,18.981-12.305,30.288-13.948l136.993-19.906l61.265-124.137c5.057-10.246,12.88-18.716,22.625-24.495
			c9.04-5.36,19.399-8.193,29.96-8.193c10.56,0,20.92,2.833,29.96,8.193c9.744,5.778,17.568,14.249,22.625,24.495l61.265,124.137
			l136.994,19.906c11.306,1.642,21.778,6.465,30.286,13.948c7.892,6.94,13.788,15.918,17.051,25.962
			c3.264,10.044,3.771,20.772,1.466,31.025c-2.484,11.053-8.122,21.11-16.305,29.086l-99.129,96.627l23.401,136.438
			c2.93,17.085-1.773,34.456-12.905,47.659C484.562,582.642,468.2,590.27,450.887,590.27z M301.066,517.953l0.233,0.122
			l122.762,64.54c8.281,4.354,17.558,6.655,26.825,6.655c17.018,0,33.101-7.499,44.125-20.573
			c10.94-12.978,15.563-30.052,12.683-46.845l-23.489-136.958l99.506-96.994c8.042-7.84,13.584-17.726,16.025-28.589
			c2.266-10.078,1.768-20.624-1.44-30.497s-9.003-18.698-16.76-25.52c-8.362-7.354-18.656-12.095-29.771-13.709l-137.514-19.981
			l-0.116-0.236L352.755,44.994c-4.971-10.072-12.661-18.397-22.238-24.077c-8.886-5.269-19.069-8.054-29.45-8.054
			c-10.381,0-20.565,2.785-29.45,8.054c-9.577,5.679-17.267,14.005-22.238,24.077l-61.498,124.608l-0.26,0.038L50.368,189.584
			c-11.114,1.615-21.409,6.355-29.771,13.709c-7.756,6.822-13.552,15.646-16.76,25.52c-3.208,9.873-3.706,20.418-1.441,30.497
			c2.442,10.864,7.984,20.75,16.027,28.59l99.505,96.994l-0.044,0.26L94.438,521.852c-2.88,16.793,1.743,33.867,12.684,46.845
			c11.023,13.074,27.105,20.573,44.124,20.573c9.268,0,18.544-2.302,26.826-6.655L301.066,517.953z M450.887,547.43
			c-2.547,0-5.021-0.622-7.354-1.85l-135.578-71.277c-4.229-2.225-9.542-2.225-13.775,0l-135.578,71.277
			c-2.333,1.228-4.808,1.85-7.355,1.85c-4.657,0-9.08-2.078-12.136-5.702c-3.017-3.578-4.236-8.125-3.434-12.804l25.893-150.969
			c0.824-4.801-0.768-9.698-4.257-13.099L47.627,257.939c-4.338-4.228-5.87-10.434-3.998-16.196s6.759-9.882,12.755-10.753
			l151.582-22.026c4.821-0.701,8.987-3.728,11.143-8.096l67.79-137.356c2.681-5.433,8.109-8.808,14.168-8.808
			c6.058,0,11.487,3.375,14.167,8.808l67.79,137.356c2.156,4.369,6.322,7.396,11.144,8.096l151.581,22.026
			c5.996,0.871,10.884,4.992,12.756,10.754c1.872,5.761,0.34,11.967-3.999,16.195L444.82,364.857
			c-3.489,3.4-5.08,8.297-4.256,13.099l25.893,150.969c0.802,4.678-0.418,9.225-3.435,12.803
			C459.967,545.352,455.544,547.43,450.887,547.43z M301.066,471.603c2.552,0,5.095,0.628,7.353,1.815l135.578,71.277
			c2.189,1.15,4.507,1.734,6.89,1.734c4.361,0,8.507-1.949,11.371-5.348c2.824-3.349,3.965-7.606,3.213-11.988l-25.893-150.969
			c-0.879-5.127,0.819-10.354,4.545-13.985l109.685-106.917c4.063-3.961,5.498-9.774,3.745-15.17
			c-1.754-5.397-6.332-9.257-11.949-10.074l-151.581-22.026c-5.146-0.748-9.594-3.979-11.896-8.643l-67.79-137.356
			c-2.512-5.089-7.597-8.25-13.271-8.25c-5.675,0-10.76,3.161-13.271,8.25l-67.79,137.356c-2.302,4.664-6.749,7.896-11.896,8.643
			L56.527,231.979c-5.616,0.816-10.194,4.676-11.947,10.073s-0.318,11.21,3.745,15.171L158.01,364.14
			c3.725,3.631,5.424,8.859,4.544,13.985l-25.893,150.969c-0.751,4.382,0.39,8.64,3.213,11.989c2.865,3.397,7.01,5.347,11.371,5.347
			c2.384,0,4.702-0.584,6.89-1.734l135.578-71.277C295.973,472.231,298.515,471.603,301.066,471.603z"
            />
          </g>
        </g>
      </svg>
    ),
    viewBox: "0 0 602.134 602.133"
  }
};

export default pengIcons;
