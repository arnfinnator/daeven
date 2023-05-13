const ListCard = (props) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          padding: "12px",
          margin: "12px 0",
          display: "flex",
        }}
      >
        <p>{props.text}</p>

        <a
          style={{
            color: "inherit",

            padding: "0 12px",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            textDecoration: "none",
          }}
          href="#sortingExample"
        >
          <span class="material-symbols-outlined">keyboard_arrow_down</span>
        </a>
      </div>
    </>
  );
};

export default ListCard;
