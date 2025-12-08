// Simple i18n utility for ProriseChat
// ProriseChat 简单国际化工具

// Language definitions
// 语言定义
const LANGUAGES = {
	en: {
		code: 'en',
		name: 'English',
		flag: '🇺🇸',
		translations: {
			// Meta tags for SEO
			'meta.description': 'ProriseChat - True end-to-end encrypted chat system, no database, all messages encrypted locally, server only relays encrypted data, supports Cloudflare Workers, Docker, self-hosting and local development.',
			'meta.keywords': 'end-to-end encryption, security, chat, WebSocket, Cloudflare Workers, JavaScript, E2EE, anonymous communication, AES, ECDH, RSA, ChaCha20, security, open source, ProriseChat, shuaiplus',
			'meta.og_title': 'ProriseChat - End-to-End Encrypted Chat System',
			'meta.og_description': 'ProriseChat is a zero-knowledge, end-to-end encrypted open source chat system where all encryption and decryption is done locally on the client side, and servers cannot access plaintext. Supports multi-platform deployment, secure, anonymous, no message history.',
			'meta.twitter_title': 'ProriseChat - End-to-End Encrypted Chat System',
			'meta.twitter_description': 'ProriseChat is a zero-knowledge, end-to-end encrypted open source chat system where all encryption and decryption is done locally on the client side, and servers cannot access plaintext.',

			// Login and main UI
			'ui.enter_node': 'Enter a Node',
			'ui.username': 'Username',
			'ui.node_name': 'Node Name',
			'ui.node_password': 'Node Password',
			'ui.optional': '(optional)',
			'ui.enter': 'ENTER',
			'ui.connecting': 'Connecting...',
			'ui.node_exists': 'Node already exists',
			'ui.my_name': 'My Name',
			'ui.members': 'Members',
			'ui.message': 'Message',
			'ui.private_message_to': 'Private Message to',
			'ui.me': ' (me)',
			'ui.anonymous': 'Anonymous',
			'ui.start_private_chat': 'Select for private chat',

			// Settings panel
			'settings.title': 'Settings',
			'settings.notification': 'Notification Settings',
			'settings.theme': 'Theme Settings',
			'settings.language': 'Language Settings',
			'settings.desktop_notifications': 'Desktop Notifications',
			'settings.sound_notifications': 'Sound Notifications',
			'settings.language_switch': 'Language',
			'settings.chinese': 'Chinese',
			'settings.english': 'English',

			// File upload and transfer
			'file.selected_files': 'Selected Files',
			'file.clear_all': 'Clear All',
			'file.cancel': 'Cancel',
			'file.send_files': 'Send Files', 'file.sending': 'Sending',
			'file.receiving': 'Receiving',
			'file.files': 'files',
			'file.total': 'Total',
			'file.files_selected': '{count} files selected, {size} total',
			'file.upload_files': 'Upload Files',
			'file.attach_file': 'Attach file',
			'file.no_password_required': 'No password required',
			'file.drag_drop': 'Drag and drop files here',
			'file.or': 'or',
			'file.browse_files': 'browse files',

			// Notifications and messages
			'notification.enabled': 'Notifications enabled',
			'notification.alert_here': 'You will receive alerts here.',
			'notification.not_supported': 'Notifications are not supported by your browser.',
			'notification.allow_browser': 'Please allow notifications in your browser settings.',
			'notification.image': '[image]',
			'notification.private': '(Private)',

			// Actions and menu
			'action.share': 'Share',
			'action.exit': 'Exit',
			'action.emoji': 'Emoji',
			'action.settings': 'Settings',
			'action.back': 'Back',
			'action.copied': 'Copied to clipboard!',
			'action.share_copied': 'Share link copied!',
			'action.copy_failed': 'Copy failed, text:',
			'action.copy_url_failed': 'Copy failed, url:',
			'action.nothing_to_copy': 'Nothing to copy',
			'action.copy_not_supported': 'Copy not supported in this environment',
			'action.action_failed': 'Action failed. Please try again.',
			'action.cannot_share': 'Cannot share:',
			// System messages
			'system.security_warning': '⚠️ This link uses an old format. Room data is not encrypted.',
			'system.file_send_failed': 'Failed to send files:',
			'system.joined': 'joined the conversation',
			'system.left': 'left the conversation',
			'system.secured': 'connection secured',
			'system.private_message_failed': 'Cannot send private message to',
			'system.private_file_failed': 'Cannot send private file to',
			'system.user_not_connected': 'User might not be fully connected.',
			// Help page
			'help.title': 'User Guide',
			'help.back_to_login': 'Back to Login',
			'help.usage_guide': 'User Guide',
			'help.what_is_ProriseChat': '🔐 What is ProriseChat?', 'help.what_is_ProriseChat_desc': 'ProriseChat is a true zero-knowledge end-to-end encrypted chat system. With a database-free architecture, all messages are encrypted locally on your device, and the server serves only as an encrypted data relay station, unable to access any of your plaintext content.',
			'help.how_to_start': '🚀 Quick Start',
			'help.step_username': 'Enter Username',
			'help.step_username_desc': 'Choose a display name for the room, can be any name you like',
			'help.step_node_name': 'Set Node Name',
			'help.step_node_name_desc': 'Unique identifier for the room, equivalent to room number',
			'help.step_password': 'Set Node Password',
			'help.step_password_desc': 'Used to distinguish different rooms while participating in encryption process to enhance security',
			'help.step_join': 'Click "Join Room"',
			'help.step_join_desc': 'System will automatically generate encryption keys and start secure chatting',
			'help.security_features': '🔑 Security Features', 'help.e2e_encryption': '🛡️ End-to-End Encryption',
			'help.e2e_encryption_desc': 'Uses AES-256 + ECDH encryption algorithm, messages can only be decrypted by you and the recipient',
			'help.password_enhanced_encryption': '🔐 Password Enhanced Encryption',
			'help.password_enhanced_encryption_desc': 'Node password directly participates in encryption key generation, providing additional security protection layer',
			'help.no_history': '🚫 Zero History Records',
			'help.no_history_desc': 'All messages exist only in current session, offline users cannot get historical messages',
			'help.anonymous_communication': '🎭 Complete Anonymity',
			'help.anonymous_communication_desc': 'No account registration required, no personal information collected',
			'help.decentralized': '🌐 Decentralized',
			'help.decentralized_desc': 'Supports self-hosted deployment, server does not participate in encryption/decryption process', 'help.usage_tips': '💡 Usage Tips',
			'help.important_note': '⚠️ Important Note',
			'help.room_isolation_note': 'Same node name but different passwords are two completely independent rooms that cannot communicate with each other.',
			'help.tip_private_chat': 'Private Chat',
			'help.tip_private_chat_desc': 'Use complex node names and passwords, share only with specific people',
			'help.tip_group_chat': 'Group Chat',
			'help.tip_group_chat_desc': 'Use simple and memorable node names and passwords for easy multi-user joining',
			'help.tip_security_reminder': 'Security Reminder',
			'help.tip_security_reminder_desc': 'Both node name and password must be exactly the same to enter the same room',
			'help.tip_password_strategy': 'Password Strategy',
			'help.tip_password_strategy_desc': 'Recommend using strong passwords containing letters, numbers and symbols',
		}
	},
	zh: {
		code: 'zh',
		name: '中文',
		flag: '🇨🇳',
		translations: {
			// Meta tags for SEO
			'meta.description': 'ProriseChat - 真正的端到端加密聊天系统，无数据库，所有消息本地加密，服务器仅做加密数据中转，支持 Cloudflare Workers、Docker、自托管和本地开发。',
			'meta.keywords': '端到端加密, 安全, 聊天, WebSocket, Cloudflare Workers, JavaScript, E2EE, 匿名通信, AES, ECDH, RSA, ChaCha20, 安全, 开源, ProriseChat, shuaiplus',
			'meta.og_title': 'ProriseChat - 端到端加密聊天系统',
			'meta.og_description': 'ProriseChat 是一个端到端加密的开源聊天系统，所有加密解密均在客户端本地完成，服务器无法获取明文。支持多平台部署，安全、匿名、无历史消息。',
			'meta.twitter_title': 'ProriseChat - 端到端加密聊天系统',
			'meta.twitter_description': 'ProriseChat 是一个端到端加密的开源聊天系统，所有加密解密均在客户端本地完成，服务器无法获取明文。',

			// Login and main UI
			'ui.enter_node': '进入新的聊天室',
			'ui.username': '用户名',
			'ui.node_name': '节点名称',
			'ui.node_password': '节点密码',
			'ui.optional': '（可选）',
			'ui.enter': '确定',
			'ui.connecting': '连接中...',
			'ui.node_exists': '此节点已存在',
			'ui.my_name': '我的名字',
			'ui.members': '在线成员',
			'ui.message': '消息',
			'ui.private_message_to': '私信给',
			'ui.me': '（我）',
			'ui.anonymous': '匿名用户',
			'ui.start_private_chat': '选择用户开始私信',

			// Settings panel
			'settings.title': '设置',
			'settings.notification': '通知设置',
			'settings.theme': '主题设置',
			'settings.language': '语言设置',
			'settings.desktop_notifications': '桌面通知',
			'settings.sound_notifications': '声音通知',
			'settings.language_switch': '语言',
			'settings.chinese': '中文',
			'settings.english': 'English',

			// File upload and transfer
			'file.selected_files': '已选择的文件',
			'file.clear_all': '清空所有',
			'file.cancel': '取消',
			'file.send_files': '发送文件', 'file.sending': '发送中',
			'file.receiving': '接收中',
			'file.files': '个文件',
			'file.total': '总计',
			'file.files_selected': '选中 {count} 个文件，总计 {size}',
			'file.upload_files': '上传文件',
			'file.attach_file': '附加文件',
			'file.no_password_required': '无需密码',
			'file.drag_drop': '拖拽文件到此处',
			'file.or': '或',
			'file.browse_files': '浏览文件',

			// Notifications and messages
			'notification.enabled': '通知已启用',
			'notification.alert_here': '您将在此处收到通知。',
			'notification.not_supported': '您的浏览器不支持通知功能。',
			'notification.allow_browser': '请在浏览器设置中允许通知。',
			'notification.image': '[图片]',
			'notification.private': '（私信）',

			// Actions and menu
			'action.share': '分享',
			'action.exit': '退出',
			'action.emoji': '表情',
			'action.settings': '设置',
			'action.back': '返回',
			'action.copied': '已复制到剪贴板！',
			'action.share_copied': '分享链接已复制！',
			'action.copy_failed': '复制失败，文本：',
			'action.copy_url_failed': '复制失败，链接：',
			'action.nothing_to_copy': '没有内容可复制',
			'action.copy_not_supported': '此环境不支持复制功能',
			'action.action_failed': '操作失败，请重试。',
			'action.cannot_share': '无法分享：',
			// System messages
			'system.security_warning': '⚠️ 此链接使用旧格式，房间数据未加密。',
			'system.file_send_failed': '文件发送失败：',
			'system.joined': '加入了对话',
			'system.left': '离开了对话',
			'system.secured': '已建立端到端安全连接',
			'system.private_message_failed': '无法发送私信给',
			'system.private_file_failed': '无法发送私密文件给',
			'system.user_not_connected': '用户可能未完全连接。',

			// Help page
			'help.title': '使用说明',
			'help.back_to_login': '返回登录',
			'help.usage_guide': '使用说明',
			'help.what_is_ProriseChat': '🔐 什么是 ProriseChat？', 'help.what_is_ProriseChat_desc': 'ProriseChat 是一个真正的端到端加密聊天系统。采用无数据库架构，所有消息在您的设备上本地加密，服务器仅作为加密数据的中转站，无法获取您的任何明文内容。',
			'help.how_to_start': '🚀 快速开始',
			'help.step_username': '输入用户名',
			'help.step_username_desc': '选择一个在房间中显示的昵称，可以是任何您喜欢的名称',
			'help.step_node_name': '设置节点名',
			'help.step_node_name_desc': '房间的唯一标识符，相当于房间号',
			'help.step_password': '设置节点密码',
			'help.step_password_desc': '用于区分不同房间，同时参与加密过程，提升安全性',
			'help.step_join': '点击"加入房间"',
			'help.step_join_desc': '系统将自动生成加密密钥，开始安全聊天',
			'help.security_features': '🔑 安全特性',
			'help.e2e_encryption': '🛡️ 端到端加密',
			'help.e2e_encryption_desc': '使用 AES-256 + ECDH 加密算法，消息仅您和接收者可解密',
			'help.password_enhanced_encryption': '🔐 密码增强加密',
			'help.password_enhanced_encryption_desc': '节点密码直接参与加密密钥生成，提供额外的安全保护层',
			'help.no_history': '🚫 零历史记录',
			'help.no_history_desc': '所有消息仅存在于当前会话，离线用户无法获取历史消息',
			'help.anonymous_communication': '🎭 完全匿名',
			'help.anonymous_communication_desc': '无需注册账户，不收集任何个人信息',
			'help.decentralized': '🌐 去中心化',
			'help.decentralized_desc': '支持自托管部署，服务器不参与加密解密过程', 'help.usage_tips': '💡 使用技巧',
			'help.important_note': '⚠️ 重要提示',
			'help.room_isolation_note': '相同节点名但不同密码的是两个完全独立的房间，无法相互通信。',
			'help.tip_private_chat': '私人对话',
			'help.tip_private_chat_desc': '使用复杂的节点名和密码，只分享给特定人员',
			'help.tip_group_chat': '群聊',
			'help.tip_group_chat_desc': '使用简单易记的节点名和密码，方便多人加入',
			'help.tip_security_reminder': '安全提醒',
			'help.tip_security_reminder_desc': '节点名和密码都需要完全一致才能进入同一个房间',
			'help.tip_password_strategy': '密码策略',
			'help.tip_password_strategy_desc': '建议使用包含字母、数字和符号的强密码',
		}
	}
};

// Current language
// 当前语言
let currentLanguage = 'en';

// Get translation for a key
// 获取翻译文本
export function t(key, fallback = key) {
	const lang = LANGUAGES[currentLanguage];
	if (lang && lang.translations && lang.translations[key]) {
		return lang.translations[key];
	}
	return fallback;
}

// Set current language
// 设置当前语言
export function setLanguage(langCode) {
	if (LANGUAGES[langCode]) {
		currentLanguage = langCode;
		// Update document language attribute
		// 更新文档语言属性
		document.documentElement.lang = langCode;

		// Update static HTML texts
		// 更新HTML中的静态文本
		updateStaticTexts();

		// Dispatch language change event for other components to listen
		// 派发语言变更事件供其他组件监听
		window.dispatchEvent(new CustomEvent('languageChange', {
			detail: { language: langCode }
		}));
	}
}

// Get current language
// 获取当前语言
export function getCurrentLanguage() {
	return currentLanguage;
}

// Get all available languages
// 获取所有可用语言
export function getAvailableLanguages() {
	return Object.keys(LANGUAGES).map(code => ({
		code,
		name: LANGUAGES[code].name,
		flag: LANGUAGES[code].flag
	}));
}

// Initialize i18n with settings
// 根据设置初始化国际化
export function initI18n(settings) {
	if (settings && settings.language) {
		setLanguage(settings.language);
	} else {
		// Auto-detect browser language
		// 自动检测浏览器语言
		const browserLang = detectBrowserLanguage();
		setLanguage(browserLang);
	}
}

// Detect browser language and return supported language code
// 检测浏览器语言并返回支持的语言代码
function detectBrowserLanguage() {
	const navigatorLang = navigator.language || navigator.userLanguage || 'en';

	// Extract language code (e.g., 'zh-CN' -> 'zh', 'en-US' -> 'en')
	const langCode = navigatorLang.split('-')[0].toLowerCase();

	// Check if we support this language
	if (LANGUAGES[langCode]) {
		return langCode;
	}

	// Default fallback to English
	return 'en';
}

// Update static HTML text elements
// 更新HTML中的静态文本元素
export function updateStaticTexts() {
	// 如果DOM还没准备好，等待DOM准备好再更新
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => updateStaticTexts());
		return;
	}

	// Update login title
	const loginTitle = document.getElementById('login-title');
	if (loginTitle) {
		loginTitle.textContent = t('ui.enter_node', 'Enter a Node');
	}
	// Update login form content with new translations
	const loginFormContainer = document.getElementById('login-form');
	if (loginFormContainer) {
		// Use a custom event to trigger form regeneration instead of dynamic import
		// 使用自定义事件触发表单重新生成，而不是动态导入
		window.dispatchEvent(new CustomEvent('regenerateLoginForm'));
	}

	// Update sidebar username label
	const sidebarUsername = document.getElementById('sidebar-username');
	if (sidebarUsername) {
		// Use a custom event to update sidebar username instead of dynamic import
		// 使用自定义事件更新侧边栏用户名，而不是动态导入
		window.dispatchEvent(new CustomEvent('updateSidebarUsername'));
	}
	// Update "Enter a Node" text in sidebar
	const joinRoomText = document.getElementById('join-room-text');
	if (joinRoomText) {
		joinRoomText.textContent = t('ui.enter_node', 'Enter a Node');
	}

	// Update Members title in rightbar
	const membersTitle = document.getElementById('members-title');
	if (membersTitle) {
		membersTitle.textContent = t('ui.members', 'Members');
	}

	// Update settings title
	const settingsTitle = document.getElementById('settings-title');
	if (settingsTitle) {
		settingsTitle.textContent = t('settings.title', 'Settings');
	}

	// Update message placeholder
	const messagePlaceholder = document.querySelector('.input-field-placeholder');
	if (messagePlaceholder) {
		messagePlaceholder.textContent = t('ui.message', 'Message');
	}

	// Update attach button title
	const attachBtn = document.querySelector('.chat-attach-btn');
	if (attachBtn) {
		attachBtn.title = t('file.attach_file', 'Attach file');
	}

	// Update emoji button title
	const emojiBtn = document.querySelector('.chat-emoji-btn');
	if (emojiBtn) {
		emojiBtn.title = t('action.emoji', 'Emoji');
	}
	// Update settings button title
	const settingsBtn = document.getElementById('settings-btn');
	if (settingsBtn) {
		settingsBtn.title = t('action.settings', 'Settings');
		settingsBtn.setAttribute('aria-label', t('action.settings', 'Settings'));
	}
	// Update back button title
	const backBtn = document.getElementById('settings-back-btn');
	if (backBtn) {
		backBtn.title = t('action.back', 'Back');
		backBtn.setAttribute('aria-label', t('action.back', 'Back'));
	}

	// Update all elements with data-i18n attribute
	// 更新所有具有data-i18n属性的元素
	const i18nElements = document.querySelectorAll('[data-i18n]');
	i18nElements.forEach(element => {
		const key = element.getAttribute('data-i18n');
		if (key) {
			element.textContent = t(key, element.textContent || key);
		}
	});

	// Update all elements with data-i18n-title attribute
	// 更新所有具有data-i18n-title属性的元素
	const i18nTitleElements = document.querySelectorAll('[data-i18n-title]');
	i18nTitleElements.forEach(element => {
		const key = element.getAttribute('data-i18n-title');
		if (key) {
			element.title = t(key, element.title || key);
		}
	});

	// Update meta tags
	// 更新meta标签
	updateMetaTags();
}

// Update meta tags with current language
// 使用当前语言更新meta标签
function updateMetaTags() {
	// Update description meta tag
	const metaDescription = document.querySelector('meta[name="description"]');
	if (metaDescription) {
		metaDescription.content = t('meta.description', metaDescription.content);
	}

	// Update keywords meta tag
	const metaKeywords = document.querySelector('meta[name="keywords"]');
	if (metaKeywords) {
		metaKeywords.content = t('meta.keywords', metaKeywords.content);
	}

	// Update og:title meta tag
	const metaOgTitle = document.querySelector('meta[property="og:title"]');
	if (metaOgTitle) {
		metaOgTitle.content = t('meta.og_title', metaOgTitle.content);
	}

	// Update og:description meta tag
	const metaOgDescription = document.querySelector('meta[property="og:description"]');
	if (metaOgDescription) {
		metaOgDescription.content = t('meta.og_description', metaOgDescription.content);
	}

	// Update twitter:title meta tag
	const metaTwitterTitle = document.querySelector('meta[name="twitter:title"]');
	if (metaTwitterTitle) {
		metaTwitterTitle.content = t('meta.twitter_title', metaTwitterTitle.content);
	}

	// Update twitter:description meta tag
	const metaTwitterDescription = document.querySelector('meta[name="twitter:description"]');
	if (metaTwitterDescription) {
		metaTwitterDescription.content = t('meta.twitter_description', metaTwitterDescription.content);
	}
}
