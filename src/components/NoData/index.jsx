import { Empty, Row } from "antd";

export function NoData({ title = "Không có dữ liệu", description }) {
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{title}</p>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(0,0,0,0.45)",
              }}
            >
              {description}
            </p>
          </>
        }
      />
    </Row>
  );
}
