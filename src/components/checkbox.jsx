const Checkbox = ({ label, isCheck, onClick }) => {
  return (
    <div className="checkbox-wrapper">
      <label style={{ cursor: "pointer" }}>
        <span
          className={`px-1 font-Noto font-medium ${
            isCheck ? "text-green-500" : "text-base"
          }`}
        >
          {label}
        </span>

        <input
          type="checkbox"
          checked={isCheck}
          onChange={() => onClick(isCheck)}
        />
      </label>
    </div>
  );
};
export default Checkbox;
