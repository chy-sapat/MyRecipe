import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "@styles/notification.scss";

const NotificationPanel = () => {
  const notificationPanelStatus = useSelector(
    (state) => state.notificationPanel.value
  );
  return (
    <>
      <section
        className={`notification-panel ${notificationPanelStatus}-notification`}
      >
        <h3 className="heading">Notifications</h3>
        <section className="empty-notification">
          <p>No Notifications</p>
        </section>
      </section>
    </>
  );
};

export default NotificationPanel;
