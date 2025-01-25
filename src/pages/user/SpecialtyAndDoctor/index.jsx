import { CheckCircleOutlined, SelectOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Flex, Row, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "src/api/user";
import AddAppointmentPatient from "src/components/AddAppointmentPatient";
import { NoData } from "src/components/NoData";
import Title from "src/components/Title";
import { getSourceImage, Specialties } from "src/utils";

export default function SpecialtyAndDoctor() {
  const [activeTab, setActiveTab] = useState("1");
  const [listDoctor, setListDoctor] = useState([]);
  const [specialty, setSpecialty] = useState("");
  const [doctor, setDoctor] = useState(null);

  const [viewVisibleAppointmentModal, setViewVisibleAppointmentModal] =
    useState(false);
  const patient = useSelector((state) => state.auth.user);
  const [addVisiableAppointment, setAddVisiableAppointment] = useState(false);
  const [selectedAppointent, setSelectedAppointent] = useState(null);

  useEffect(() => {
    const initData = async () => {
      setListDoctor([]);
      const { users } = await getUsers({
        userType: "doctor",
        specialty: specialty,
      });

      setListDoctor(users);
    };

    initData();
  }, [specialty, activeTab]);

  const handleAddAppointmentCancel = (reset) => {
    setAddVisiableAppointment(false);

    if (!viewVisibleAppointmentModal) {
      setSelectedAppointent(null);
    }
    reset();
  };

  const handleAppointmentOk = async (values) => {
    try {
      setAddVisiableAppointment(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderDoctor = (doctor) => {
    setDoctor(doctor);
    setAddVisiableAppointment(true);
  };
  return (
    <>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        items={[
          {
            label: "Chuyên khoa",
            key: "1",
            children: (
              <>
                <Title title="Chuyên khoa" />
                <Row gutter={[16, 16]}>
                  {Specialties.map((item) => (
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      xl={4}
                      className="gutter-row"
                      key={item.id}
                    >
                      <Card
                        hoverable
                        style={{ width: "100%", marginBottom: "20px" }}
                        onClick={() => {
                          setSpecialty(item.id);
                          setActiveTab("2");
                        }}
                      >
                        <Card.Meta
                          title={
                            <Row justify="space-between">
                              <div>
                                <span
                                  style={{ color: "red", marginRight: "5px" }}
                                >
                                  *
                                </span>
                                <span>{item.name}</span>
                              </div>
                              {specialty !== "" && item.id === specialty && (
                                <CheckCircleOutlined
                                  style={{ color: "green" }}
                                />
                              )}
                            </Row>
                          }
                          description={item.description}
                          style={{
                            height: "100px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            ),
          },
          {
            label: "Bác sỹ",
            key: "2",
            children: (
              <>
                <Title title="Bác sỹ" />
                {listDoctor.length > 0 ? (
                  <Row gutter={[16, 16]}>
                    {listDoctor.map((doctor) => (
                      <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        xl={6}
                        className="gutter-row"
                        key={doctor?._id}
                      >
                        <Card
                          loading={false}
                          actions={[
                            <Flex
                              justify="flex-end"
                              style={{ padding: "0px 10px 0 10px" }}
                            >
                              <Button onClick={() => handleOrderDoctor(doctor)}>
                                Đặt lịch bác sỹ
                                <SelectOutlined key="selected" />
                              </Button>
                            </Flex>,
                          ]}
                          style={{
                            minWidth: "100%",
                            marginBottom: "20px",
                          }}
                        >
                          <Card.Meta
                            avatar={
                              <Avatar src={getSourceImage(doctor?.photo)} />
                            }
                            title={doctor?.fullName}
                            description={
                              <p>
                                {Specialties.find(
                                  (item) => item.id === specialty
                                )?.name || ""}
                              </p>
                            }
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <NoData description="Chưa tìm thấy bác sỹ cho khoa này. Vui lòng chọn khoa khác." />
                )}
              </>
            ),
            disabled: specialty === "",
          },
        ]}
      />

      <AddAppointmentPatient
        visible={addVisiableAppointment}
        onCancel={handleAddAppointmentCancel}
        onFinish={handleAppointmentOk}
        selectedPatient={patient}
        selectedAppointent={selectedAppointent}
        isPatient
        doctorValue={doctor}
      />
    </>
  );
}
