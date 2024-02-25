import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Input, Form } from "antd";
import AdminHeader from "./AdminNavigation/AdminHeader";
import AdminSidebar from "./AdminSidebar";
import Axios from "../../Axios";

const AdminDamagePage = () => {
  const [supportTickets, setSupportTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({
    id: null,
    subject: "",
    status: "",
    replies: [],
    rentalName: "",
    disputeMessage: "",
    disputeEmail: "",
  });
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [replyForm] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const fetchReportedIssues = async () => {
    try {
      const response = await Axios.get("/getReportDamagesForAdmin");
      const data = response.data.data;
      console.log(data);
      setSupportTickets(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reported issues:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportedIssues();
  }, []);

  const columns = [
    {
        title: "Reporter Name",
        dataIndex: ["reporter", "name"],
        key: "reporterName",
      },
      {
        title: "Reporter Email",
        dataIndex: ["reporter", "email"],
        key: "reporterEmail",
      },
      {
        title: "Reporter Phone",
        dataIndex: ["reporter", "phone"],
        key: "reporterPhone",
      },
      {
        title: "Booking ID",
        dataIndex: ["apartment", "id"],
        key: "apartmentId",
      },
      {
        title: "Apartment Address",
        dataIndex: ["apartment", "address"],
        key: "apartmentAddress",
      },
      {
        title: "Apartment Description",
        dataIndex: ["apartment", "description"],
        key: "apartmentDescription",
      },
      {
        title: "Damage Details",
        dataIndex: ["apartment", "damageDetails"],
        key: "damageDetails",
      },
      {
        title: "Police Report Filed",
        dataIndex: ["apartment", "policeReportFiled"],
        key: "policeReportFiled",
        render: (text) => (text ? "Yes" : "No"),
      },
      {
        title: "Guest Name",
        dataIndex: ["guest", "name"],
        key: "guestName",
      },
      {
        title: "Guest Email",
        dataIndex: ["guest", "email"],
        key: "guestEmail",
      },
      {
        title: "Guest Phone",
        dataIndex: ["guest", "phone"],
        key: "guestPhone",
      },
      {
        title: "Incident Date",
        dataIndex: "incidentDate",
        key: "incidentDate",
      },
      {
        title: "Report Date",
        dataIndex: "reportDate",
        key: "reportDate",
      },
      {
        title: "Additional Notes",
        dataIndex: "additionalNotes",
        key: "additionalNotes",
      },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button onClick={() => showTicketModal(record)}>Message Host</Button>
      ),
    },
    
  ];

  const showTicketModal = (ticket) => {
    setSelectedTicket({
      id: ticket.id,
      subject: ticket.title,
      status: ticket.status,
      replies: ticket.replies || [],
      rentalName: ticket.homeName,
      disputeMessage: ticket.reasonforreporting,
      disputeEmail: ticket.disputeEmail,
    });
    setTicketModalVisible(true);
  };

  const handleReplySubmit = () => {
    const { id } = selectedTicket;
    replyForm.validateFields().then((values) => {
      const updatedTickets = supportTickets.map((ticket) => {
        if (ticket.id === id) {
          return {
            ...ticket,
            replies: [...ticket.replies, values.reply],
          };
        }
        return ticket;
      });
      setSupportTickets(updatedTickets);
      replyForm.resetFields();
    });
  };

  return (
    <div className="bg-gray-100 h-[100vh]">
      <AdminHeader />
      <div className="flex">
        <div className="bg-orange-400  text-white hidden md:block md:w-1/5 h-[100vh] p-4">
          <AdminSidebar />
        </div>

        <div className="w-full md:w-4/5 p-4 h-[100vh] overflow-auto example">
        <h1 className="text-2xl font-semibold mb-4">Damage Reports</h1>
          <div className="mb-4">
          </div>
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={supportTickets}
              rowKey="id"
              loading={loading} // Show loader inside the table
            />
          </div>
          <Modal
            title="Damage Report  Details"
            open={ticketModalVisible}
            onCancel={() => setTicketModalVisible(false)}
            footer={null}
          >
            {selectedTicket && (
              <div>
                <p>Ticket ID: {selectedTicket.id}</p>
                <p>Subject: {selectedTicket.subject}</p>
                <p>Status: {selectedTicket.status}</p>
                <h3>Replies:</h3>
                <ul>
                  {selectedTicket.replies.map((reply, index) => (
                    <li key={index}>{reply}</li>
                  ))}
                </ul>
                <Form form={replyForm} layout="vertical">
                  <Form.Item
                    name="reply"
                    label="Reply"
                    rules={[
                      { required: true, message: "Please enter a reply" },
                    ]}
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>
                  <Button type="primary" onClick={handleReplySubmit}>
                    Add Reply
                  </Button>
                </Form>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AdminDamagePage;
