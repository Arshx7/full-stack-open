function Notification({ message }) {
  if (message.text === null) {
    return null;
  }
  const notificationStyle = message.type === "error" ? "error" : "success";

  return (
    <>
      <div className={notificationStyle}>{message.text}</div>
    </>
  );
}
export default Notification;
