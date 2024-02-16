import React from "react";

import "@styles/notification.scss";

const NotificationPanel = ({ notificationPanelOpen }) => {
  return (
    <>
      <section
        className={`notification-panel ${notificationPanelOpen}-notification`}
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
