import "./Popup.css"

export default function Popup({ setShow, children, title }) {
    function close(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      setShow(false);
    }
    return (
      <div
        className="back"
        onClick={close}
      >
        {/* close button */}
        {/* ()=> setShow(false) */}
        <button
          onClick={close}
          className="bclose"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="black"
            // currentColor
            style={{ width: "1rem",height: "1rem" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="wf">
        {/* ={(narrow ? 'md:max-w-sm': 'md:max-w-2xl') + */}
          <div
            className ="card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="backbutton">
              {/* back button */}
              <button
                onClick={close}
                className="hidden-on-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="black"
                  // currentColor
                  style={{width: "0.75rem",height: "0.75rem"}}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
              {!!title && <h2 className="title">{title}</h2>}
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  }
  