import { Layout, Typography, Space, Divider } from 'antd';
import { 
  GithubOutlined, 
  TwitterOutlined, 
  MailOutlined,
  HeartFilled,
} from '@ant-design/icons';
import './Footer.css';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="app-footer">
      <div className="footer-content">
        <div className="footer-left">
          <Text className="footer-copyright">
            © {currentYear} ГИС Обращения граждан. Все права защищены.
          </Text>
          <Text className="footer-made-with">
            Сделано с <HeartFilled className="heart-icon" /> в Казахстане
          </Text>
        </div>
        
        <div className="footer-right">
          <Space split={<Divider type="vertical" />}>
            <Link href="#" className="footer-link">Политика конфиденциальности</Link>
            <Link href="#" className="footer-link">Условия использования</Link>
            <Link href="#" className="footer-link">Поддержка</Link>
          </Space>
          
          <Space className="social-links" size="middle">
            <Link href="#" className="social-link">
              <GithubOutlined />
            </Link>
            <Link href="#" className="social-link">
              <TwitterOutlined />
            </Link>
            <Link href="#" className="social-link">
              <MailOutlined />
            </Link>
          </Space>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
