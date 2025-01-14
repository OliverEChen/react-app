import { Button, Card, Descriptions, Badge } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import type { DescriptionsProps } from "antd";
import { useState, useEffect } from "react";

function ConTractDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState<DescriptionsProps["items"]>([]);

  useEffect(() => {
    loadData();
  }, [state]);
  const loadData = () => {
    const arr = [];
    for (const key in state) {
      arr.push({
        key: key,
        label: key,
        children: state[key],
      });
    }
    setItems(arr);
  };
  const onBack = () => {
    navigate("/finance/contract", {
      state: {
        from: "contract-detail",
      },
    });
  };
  return (
    <div>
      <Card>
        <Button onClick={onBack}>返回</Button>
      </Card>
      <Card className="mg-t20">
        <Descriptions title="合同详情" bordered items={items} />
      </Card>
    </div>
  );
}
export default ConTractDetail;
