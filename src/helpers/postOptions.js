import { Dropdown, Menu, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

function PostOptions({ postId, onDeletePost}) {
  const handleMenuClick = async  ({ key }) => {
    if (key === 'edit') {
      console.log("Sửa bài viết:", postId);
      // gọi API hoặc mở modal sửa
    } else if (key === 'delete') {
      await  onDeletePost(postId)
    } else if (key === 'report') {
      console.log("Báo cáo bài viết:", postId);
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        { label: 'Sửa bài viết', key: 'edit' },
        { label: 'Xóa bài viết', key: 'delete' },
        { label: 'Báo cáo', key: 'report' },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button shape="circle" icon={<MoreOutlined />} />
    </Dropdown>
  );
}

export default PostOptions;
