// UI logic for ProriseChat web client
// ProriseChat 网页客户端的 UI 逻辑

import {
	createAvatarSVG
} from './util.avatar.js';
import {
	roomsData,
	activeRoomIndex,
	togglePrivateChat,
	exitRoom
} from './room.js';
import {
	escapeHTML
} from './util.string.js';
import {
	$id
} from './util.dom.js';
import {
	closeSettingsPanel
} from './util.settings.js';
import {
	t
} from './util.i18n.js';
import {
	updateChatInputStyle
} from './chat.js';

// Utility functions for security and error handling
// 安全和错误处理工具函数

// Simple encryption/decryption using base64 and character shifting
// 使用base64和字符偏移的简单加密/解密
function simpleEncrypt(text) {
	if (!text) return '';
	// Convert to base64 and shift characters
	const base64 = btoa(unescape(encodeURIComponent(text)));
	return base64.split('').map(char => {
		const code = char.charCodeAt(0);
		return String.fromCharCode(code + 3);
	}).join('');
}

function simpleDecrypt(encrypted) {
	if (!encrypted) return '';
	try {
		// Reverse character shifting and decode base64
		const shifted = encrypted.split('').map(char => {
			const code = char.charCodeAt(0);
			return String.fromCharCode(code - 3);
		}).join('');
		return decodeURIComponent(escape(atob(shifted)));
	} catch (error) {
		console.warn('Failed to decrypt data:', error);
		return '';
	}
}

// Validate room data
// 验证房间数据
function validateRoomData(roomData) {
	if (!roomData) {
		return { valid: false, error: 'No room data available' };
	}
	if (!roomData.roomName || roomData.roomName.trim() === '') {
		return { valid: false, error: 'Room name is required' };
	}
	return { valid: true };
}

// Copy text to clipboard with fallback
// 复制文本到剪贴板（含降级处理）
function copyToClipboard(text, successMessage = t('action.copied', 'Copied to clipboard!'), errorPrefix = t('action.copy_failed', 'Copy failed, url:')) {
	if (!text) {
		window.addSystemMsg && window.addSystemMsg(t('action.nothing_to_copy', 'Nothing to copy'));
		return;
	}

	if (navigator.clipboard && navigator.clipboard.writeText) {
		navigator.clipboard.writeText(text).then(() => {
			window.addSystemMsg && window.addSystemMsg(successMessage);
		}).catch((error) => {
			console.error('Clipboard write failed:', error);
			showFallbackCopy(text, errorPrefix);
		});
	} else {
		showFallbackCopy(text, errorPrefix);
	}
}

// Show fallback copy method
// 显示降级复制方法
function showFallbackCopy(text, prefix) {
	if (typeof prompt === 'function') {
		prompt(prefix, text);
	} else {
		// For environments where prompt is not available
		window.addSystemMsg && window.addSystemMsg(t('action.copy_not_supported', 'Copy not supported in this environment'));
	}
}

// Execute menu action with error handling
// 执行菜单操作并处理错误
function executeMenuAction(action, closeMenuCallback) {
	try {
		switch (action) {
			case 'share':
				handleShareAction();
				break;
			case 'exit':
				handleExitAction();
				break;
			default:
				console.warn('Unknown menu action:', action);
		}
	} catch (error) {
		console.error('Menu action failed:', error);
		window.addSystemMsg && window.addSystemMsg(t('action.action_failed', 'Action failed. Please try again.'));
	} finally {
		closeMenuCallback && closeMenuCallback();
	}
}

// Handle share action
// 处理分享操作
function handleShareAction() {
	const validation = validateRoomData(roomsData[activeRoomIndex]);
	if (!validation.valid) {
		window.addSystemMsg && window.addSystemMsg(`${t('action.cannot_share', 'Cannot share:')} ${validation.error}`);
		return;
	}

	const rd = roomsData[activeRoomIndex];
	const roomName = rd.roomName.trim();
	const password = rd.password || '';

	// Encrypt room name and password
	const encryptedRoom = simpleEncrypt(roomName);
	const encryptedPwd = password ? simpleEncrypt(password) : '';

	// Create share URL with encrypted data
	let url = `${location.origin}${location.pathname}?r=${encodeURIComponent(encryptedRoom)}`;
	if (encryptedPwd) {
		url += `&p=${encodeURIComponent(encryptedPwd)}`;
	}

	copyToClipboard(url, t('action.share_copied', 'Share link copied!'), t('action.copy_url_failed', 'Copy failed, url:'));
}

// Handle exit action
// 处理退出操作
function handleExitAction() {
	try {
		const result = exitRoom();
		if (!result) {
			location.reload();
		}
	} catch (error) {
		console.error('Exit room failed:', error);
		// Force reload as fallback
		location.reload();
	}
}

// Render the main header
// 渲染主标题栏
export function renderMainHeader() {
	const rd = roomsData[activeRoomIndex];
	let roomName = rd ? rd.roomName : 'Room';
	let onlineCount = rd && rd.userList ? rd.userList.length : 0;
	if (rd && !rd.userList.some(u => u.clientId === rd.myId)) {
		onlineCount += 1
	}
	const safeRoomName = escapeHTML(roomName);
	$id("main-header").innerHTML = `<button class="mobile-menu-btn"id="mobile-menu-btn"aria-label="Open Sidebar"><svg width="35px"height="35px"viewBox="0 0 24 24"fill="none"xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"stroke-width="0"></g><g id="SVGRepo_tracerCarrier"stroke-linecap="round"stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd"clip-rule="evenodd"d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z"fill="#808080"></path></g></svg></button><div class="main-header-center"id="main-header-center"><div class="main-header-flex"><div class="group-title group-title-bold">#${safeRoomName}</div><span class="main-header-members">${onlineCount} ${t('ui.members', 'members')}</span></div></div><div class="main-header-actions"><button class="more-btn"id="more-btn"aria-label="More Options"><svg width="35px"height="35px"viewBox="0 0 24 24"fill="none"xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"stroke-width="0"></g><g id="SVGRepo_tracerCarrier"stroke-linecap="round"stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="12"cy="6"r="1.5"fill="#808080"></circle><circle cx="12"cy="12"r="1.5"fill="#808080"></circle><circle cx="12"cy="18"r="1.5"fill="#808080"></circle></g></svg></button><button class="mobile-info-btn"id="mobile-info-btn"aria-label="Open Members"><svg width="35px"height="35px"viewBox="0 0 24 24"fill="none"xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"stroke-width="0"></g><g id="SVGRepo_tracerCarrier"stroke-linecap="round"stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd"clip-rule="evenodd"d="M16.0603 18.307C14.89 19.0619 13.4962 19.5 12 19.5C10.5038 19.5 9.10996 19.0619 7.93972 18.307C8.66519 16.7938 10.2115 15.75 12 15.75C13.7886 15.75 15.3349 16.794 16.0603 18.307ZM17.2545 17.3516C16.2326 15.5027 14.2632 14.25 12 14.25C9.73663 14.25 7.76733 15.5029 6.74545 17.3516C5.3596 15.9907 4.5 14.0958 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12C19.5 14.0958 18.6404 15.9908 17.2545 17.3516ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 12C13.2426 12 14.25 10.9926 14.25 9.75C14.25 8.50736 13.2426 7.5 12 7.5C10.7574 7.5 9.75 8.50736 9.75 9.75C9.75 10.9926 10.7574 12 12 12ZM12 13.5C14.0711 13.5 15.75 11.8211 15.75 9.75C15.75 7.67893 14.0711 6 12 6C9.92893 6 8.25 7.67893 8.25 9.75C8.25 11.8211 9.92893 13.5 12 13.5Z"fill="#808080"></path></g></svg></button><div class="more-menu"id="more-menu"><div class="more-menu-item"data-action="share">${t('action.share', 'Share')}</div><div class="more-menu-item"data-action="exit">${t('action.exit', 'Quit')}</div></div></div>`;
	setupMoreBtnMenu();
	setupMobileUIHandlers()
}

// Setup mobile UI event handlers
// 设置移动端 UI 事件处理
export function setupMobileUIHandlers() {
	const sidebar = document.getElementById('sidebar');
	const rightbar = document.getElementById('rightbar');
	const settingsSidebar = document.getElementById('settings-sidebar');
	const mobileMenuBtn = document.getElementById('mobile-menu-btn');
	const mobileInfoBtn = document.getElementById('mobile-info-btn');
	const sidebarMask = document.getElementById('mobile-sidebar-mask');
	const rightbarMask = document.getElementById('mobile-rightbar-mask');

	function isMobile() {
		return window.innerWidth <= 768
	}

	function updateMobileBtnDisplay() {
		if (isMobile()) {
			if (mobileMenuBtn) mobileMenuBtn.style.display = 'flex';
			if (mobileInfoBtn) mobileInfoBtn.style.display = 'flex'
		} else {
			if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
			if (mobileInfoBtn) mobileInfoBtn.style.display = 'none';
			if (sidebar) sidebar.classList.remove('mobile-open');
			if (rightbar) rightbar.classList.remove('mobile-open');
			if (sidebarMask) sidebarMask.classList.remove('active');
			if (rightbarMask) rightbarMask.classList.remove('active')
		}
	}
	updateMobileBtnDisplay();
	window.addEventListener('resize', updateMobileBtnDisplay);
	if (mobileMenuBtn && sidebar && sidebarMask) {
		mobileMenuBtn.onclick = function (e) {
			e.stopPropagation();
			sidebar.classList.add('mobile-open');
			sidebarMask.classList.add('active')
		}; sidebarMask.onclick = function () {
			// Check if settings sidebar is open
			if (settingsSidebar && settingsSidebar.classList.contains('mobile-open')) {
				closeSettingsPanel();
			} else {
				sidebar.classList.remove('mobile-open');
				sidebarMask.classList.remove('active');
			}
		}
	}
	if (mobileInfoBtn && rightbar && rightbarMask) {
		mobileInfoBtn.onclick = function (e) {
			e.stopPropagation();
			rightbar.classList.add('mobile-open');
			rightbarMask.classList.add('active')
		};
		rightbarMask.onclick = function () {
			rightbar.classList.remove('mobile-open');
			rightbarMask.classList.remove('active')
		}
	}	// Consolidated click event listener for closing sidebars
	document.addEventListener('click', function (ev) {
		const settingsBtn = $id('settings-btn');
		const isSettingsButtonClick = settingsBtn && settingsBtn.contains(ev.target);
		const isSettingsBackButtonClick = $id('settings-back-btn') && $id('settings-back-btn').contains(ev.target);

		// Close settings sidebar if open and click is outside (and not on the open button or back button)
		if (settingsSidebar && (settingsSidebar.classList.contains('open') || settingsSidebar.classList.contains('mobile-open'))) {
			if (!settingsSidebar.contains(ev.target) && !isSettingsButtonClick && !isSettingsBackButtonClick) {
				closeSettingsPanel();
			}
		}

		if (isMobile()) {
			// Mobile-specific logic
			if (sidebar && sidebar.classList.contains('mobile-open')) {
				if (!sidebar.contains(ev.target) && ev.target !== mobileMenuBtn) {
					sidebar.classList.remove('mobile-open');
					if (sidebarMask) sidebarMask.classList.remove('active');
				}
			}
			if (settingsSidebar && settingsSidebar.classList.contains('mobile-open')) {
				// 检查点击目标是否为设置按钮本身
				const isSettingsButton = settingsBtn && settingsBtn.contains(ev.target);
				if (!settingsSidebar.contains(ev.target) && !isSettingsButton) {
					closeSettingsPanel();
				}
			}
			if (rightbar && rightbar.classList.contains('mobile-open')) {
				if (!rightbar.contains(ev.target) && ev.target !== mobileInfoBtn) {
					rightbar.classList.remove('mobile-open');
					if (rightbarMask) rightbarMask.classList.remove('active');
				}
			}
		} else {
			// Desktop-specific logic
			// 如果设置侧边栏打开，并且点击位置在侧边栏外部且不是设置按钮本身
			if (settingsSidebar && settingsSidebar.classList.contains('open')) {
				const isSettingsButton = settingsBtn && settingsBtn.contains(ev.target);
				if (!settingsSidebar.contains(ev.target) && !isSettingsButton) {
					closeSettingsPanel();
				}
			}
		}
	})
}

// Render the user/member list
// 渲染用户/成员列表
export function renderUserList(updateHeader = false) {
	const userListEl = $id('member-list');
	if (!userListEl) return;
	userListEl.innerHTML = '';
	const rd = roomsData[activeRoomIndex];
	if (!rd) return;
	const me = rd.userList.find(u => u.clientId === rd.myId);
	const others = rd.userList.filter(u => u.clientId !== rd.myId);
	// 新增：如有其他成员，顶部插入简洁提示
	if (others.length > 0) {
		const tip = document.createElement('div');
		tip.className = 'member-tip member-tip-center';
		tip.textContent = t('ui.start_private_chat', '选择用户开始私信');
		userListEl.appendChild(tip);
	}
	if (me) userListEl.appendChild(createUserItem(me, true));
	others.forEach(u => userListEl.appendChild(createUserItem(u, false)));
	if (updateHeader) {
		renderMainHeader()
	}
}

// Create a user list item
// 创建一个用户列表项
export function createUserItem(user, isMe) {
	const div = document.createElement('div');
	const rd = roomsData[activeRoomIndex];
	const isPrivateTarget = rd && user.clientId === rd.privateChatTargetId;
	div.className = 'member' + (isMe ? ' me' : '') + (isPrivateTarget ? ' private-chat-active' : '');
	const rawName = user.userName || user.username || user.name || '';
	const safeUserName = escapeHTML(rawName);
	div.innerHTML = `<span class="avatar"></span><div class="member-info"><div class="member-name">${safeUserName}${isMe ? t('ui.me', ' (me)') : ''}</div></div>`;
	const avatarEl = div.querySelector('.avatar');
	if (avatarEl) {
		const svg = createAvatarSVG(rawName);
		const cleanSvg = svg.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
		avatarEl.innerHTML = cleanSvg
	}
	if (!isMe) {
		div.onclick = () => togglePrivateChat(user.clientId, safeUserName)
	}
	return div
}

// Setup the 'more' button menu
// 设置"更多"按钮菜单
export function setupMoreBtnMenu() {
	const btn = $id('more-btn');
	const menu = $id('more-menu');
	if (!btn || !menu) return;
	let animating = false;

	// Open the menu
	// 打开菜单
	function openMenu() {
		menu.style.display = 'block';
		menu.classList.remove('close');
		// 强制触发重绘，然后添加打开动画
		menu.offsetHeight; // 强制重绘
		menu.classList.add('open');
	}

	// Close the menu
	// 关闭菜单
	function closeMenu() {
		if (animating) return;
		animating = true;
		menu.classList.remove('open');
		menu.classList.add('close');
		setTimeout(() => {
			if (menu.classList.contains('close')) menu.style.display = 'none';
			animating = false;
		}, 300);
	}

	btn.onclick = function (e) {
		e.stopPropagation();
		if (menu.classList.contains('open')) {
			closeMenu();
		} else {
			openMenu();
		}
	};

	menu.onclick = function (e) {
		if (e.target.classList.contains('more-menu-item')) {
			const action = e.target.dataset.action;
			executeMenuAction(action, closeMenu);
		}
	};

	document.addEventListener('click', function hideMenu(ev) {
		if (!menu.contains(ev.target) && ev.target !== btn) {
			closeMenu();
		}
	});

	menu.addEventListener('animationend', function (e) {
		animating = false;
	});

	menu.addEventListener('transitionend', function (e) {
		animating = false;
	});
}

// Prevent space and special character input
// 禁止输入空格和特殊字符
export function preventSpaceInput(input) {
	if (!input) return;
	input.addEventListener('keydown', function (e) {
		if (e.key === ' ' || (/[\u0000-\u007f]/.test(e.key) && /[\p{P}\p{S}]/u.test(e.key) && e.key !== "'")) {
			e.preventDefault()
		}
	});
	input.addEventListener('input', function (e) {
		input.value = input.value.replace(/[\s\p{P}\p{S}]/gu, function (match) {
			return match === "'" ? "'" : ''
		})
	})
}

// Login form submit handler
// 登录表单提交处理函数
export function loginFormHandler(modal) {
	return function (e) {
		e.preventDefault();
		let userName, roomName, password, btn, roomInput, warnTip;
		if (modal) {
			userName = document.getElementById('userName-modal').value.trim();
			roomName = document.getElementById('roomName-modal').value.trim();
			password = document.getElementById('password-modal').value.trim();
			btn = modal.querySelector('.login-btn');
			roomInput = document.getElementById('roomName-modal')
		} else {
			userName = document.getElementById('userName').value.trim();
			roomName = document.getElementById('roomName').value.trim();
			password = document.getElementById('password').value.trim();
			btn = document.querySelector('#login-form .login-btn');
			roomInput = document.getElementById('roomName')
		}
		const exists = roomsData.some(rd => rd.roomName && rd.roomName.toLowerCase() === roomName.toLowerCase());
		if (roomInput) {
			roomInput.style.border = '';
			roomInput.style.background = '';
			if (roomInput._warnTip) {
				roomInput.parentNode.removeChild(roomInput._warnTip);
				roomInput._warnTip = null
			}
		}
		if (exists) {
			if (roomInput) {
				roomInput.style.border = '1.5px solid #e74c3c';
				roomInput.style.background = '#fff6f6';
				warnTip = document.createElement('div');
				warnTip.style.color = '#e74c3c';
				warnTip.style.fontSize = '13px';
				warnTip.style.marginTop = '4px';
				warnTip.textContent = t('ui.node_exists', 'Node already exists');
				roomInput.parentNode.appendChild(warnTip);
				roomInput._warnTip = warnTip;
				roomInput.focus()
			} if (btn) {
				btn.disabled = false;
				btn.innerText = t('ui.enter', 'ENTER')
			}
			return
		} if (btn) {
			btn.disabled = true;
			btn.innerText = t('ui.connecting', 'Connecting...')
		}
		window.joinRoom(userName, roomName, password, modal, function (success) {
			if (!success && btn) {
				btn.disabled = false;
				btn.innerText = 'ENTER'
			}
		})
	}
}

// 生成登录表单HTML
// Generate login form HTML
export function generateLoginForm(isModal = false) {
	const idPrefix = isModal ? '-modal' : '';
	return `		<div class="input-group">
			<input id="userName${idPrefix}" type="text" autocomplete="username" required minlength="1" maxlength="15" placeholder="">
			<label for="userName${idPrefix}" class="floating-label">${t('ui.username', 'Username')}</label>
		</div>
		<div class="input-group">
			<input id="roomName${idPrefix}" type="text" required minlength="1" maxlength="15" placeholder="">
			<label for="roomName${idPrefix}" class="floating-label">${t('ui.node_name', 'Node Name')}</label>
		</div>
		<div class="input-group">
			<input id="password${idPrefix}" type="password" autocomplete="${isModal ? 'off' : 'current-password'}" minlength="1" maxlength="15" placeholder="">
			<label for="password${idPrefix}" class="floating-label">${t('ui.node_password', 'Node Password')} <span class="optional">${t('ui.optional', '(optional)')}</span></label>
		</div>
		<button type="submit" class="login-btn">${t('ui.enter', 'ENTER')}</button>
	`;
}
export function openLoginModal() {
	const modal = document.createElement('div');
	modal.className = 'login-modal';
	modal.innerHTML = `<div class="login-modal-bg"></div><div class="login-modal-card"><button class="login-modal-close login-modal-close-abs">&times;</button><h1>${t('ui.enter_node', 'Enter a Node')}</h1><form id="login-form-modal">${generateLoginForm(true)}</form></div>`;
	document.body.appendChild(modal);
	modal.querySelector('.login-modal-close').onclick = () => modal.remove();
	preventSpaceInput(modal.querySelector('#userName-modal'));
	preventSpaceInput(modal.querySelector('#roomName-modal'));
	preventSpaceInput(modal.querySelector('#password-modal')); const form = modal.querySelector('#login-form-modal');
	form.addEventListener('submit', loginFormHandler(modal));
	autofillRoomPwd('-modal')
}

// Setup member list tabs
// 设置成员列表标签页
export function setupTabs() {
	const tabs = document.getElementById("member-tabs").children;
	for (let i = 0; i < tabs.length; i++) {
		tabs[i].onclick = function () {
			for (let j = 0; j < tabs.length; j++) tabs[j].classList.remove("active");
			this.classList.add("active")
		}
	}
}

// Autofill room and password from URL
// 从 URL 自动填充房间和密码
export function autofillRoomPwd(formPrefix = '') {
	const params = new URLSearchParams(window.location.search);

	// Check for new encrypted format first
	const encryptedRoom = params.get('r');
	const encryptedPwd = params.get('p');

	// Check for old plaintext format (for backward compatibility)
	const plaintextRoom = params.get('node');
	const plaintextPwd = params.get('pwd');

	let roomValue = '';
	let pwdValue = '';
	let isPlaintext = false;

	if (encryptedRoom) {
		// New encrypted format
		roomValue = simpleDecrypt(decodeURIComponent(encryptedRoom));
		if (encryptedPwd) {
			pwdValue = simpleDecrypt(decodeURIComponent(encryptedPwd));
		}
	} else if (plaintextRoom) {
		// Old plaintext format - show security warning
		roomValue = decodeURIComponent(plaintextRoom);
		if (plaintextPwd) {
			pwdValue = decodeURIComponent(plaintextPwd);
		}
		isPlaintext = true;

		// Show security warning for plaintext URLs
		if (window.addSystemMsg) {
			window.addSystemMsg(t('system.security_warning', '⚠️ This link uses an old format. Room data is not encrypted.'), true);
		}
	}
	// Fill in the form fields
	if (roomValue) {
		const roomInput = document.getElementById(formPrefix + 'roomName');
		if (roomInput) {
			roomInput.value = roomValue;
			roomInput.readOnly = true;
			roomInput.style.background = isPlaintext ? '#fff9e6' : '#f5f5f5'; // Yellow tint for plaintext
		}
		// Always lock password field when coming from a share link
		const pwdInput = document.getElementById(formPrefix + 'password');
		if (pwdInput) {
			pwdInput.value = pwdValue; // Will be empty string if no password
			pwdInput.readOnly = true;
			pwdInput.style.background = isPlaintext ? '#fff9e6' : '#f5f5f5'; // Yellow tint for plaintext

			// Add visual indicator for no password and keep label floating
			if (!pwdValue) {
				pwdInput.placeholder = 'No password required';
				// Add a space to make the input appear "filled" so the label stays floating
				pwdInput.value = ' ';
				// Make the text invisible but keep the label floating behavior
				pwdInput.style.color = 'transparent';
			}
		}
	}

	// Clear URL parameters for security
	if (roomValue || pwdValue) {
		window.history.replaceState({}, '', location.pathname);
	}
}

// 初始化登录表单
// Initialize login form
export function initLoginForm() {
	const loginFormContainer = document.getElementById('login-form');
	if (loginFormContainer && loginFormContainer.children.length === 0) {
		// 只有当登录表单为空时才初始化
		// Only initialize if login form is empty
		loginFormContainer.innerHTML = generateLoginForm(false);
	}

	// 为登录页面添加class，用于手机适配
	// Add class to login page for mobile adaptation
	document.body.classList.add('login-page');
}

// Listen for language change events to refresh UI
// 监听语言变更事件刷新UI
window.addEventListener('languageChange', () => {
	// Refresh main header and user list
	renderMainHeader();
	renderUserList(false);

	// Refresh chat input placeholder
	updateChatInputStyle();
});

// Listen for regenerate login form event
// 监听重新生成登录表单事件
window.addEventListener('regenerateLoginForm', () => {
	const loginFormContainer = document.getElementById('login-form');
	if (loginFormContainer) {
		loginFormContainer.innerHTML = generateLoginForm(false);
	}
});

// 初始化翻转卡片功能
// Initialize flip card functionality
export function initFlipCard() {
	const flipCard = document.getElementById('flip-card');
	const helpBtn = document.getElementById('help-btn');
	const backBtn = document.getElementById('back-btn');

	if (!flipCard || !helpBtn || !backBtn) return;

	const flipCardInner = flipCard.querySelector('.flip-card-inner');
	if (!flipCardInner) return;

	// 翻转状态
	let isFlipped = false;

	// 简单的翻转函数
	function toggleFlip() {
		isFlipped = !isFlipped;
		if (isFlipped) {
			flipCardInner.classList.add('flipped');
		} else {
			flipCardInner.classList.remove('flipped');
		}
	}

	// 帮助按钮点击事件
	helpBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		toggleFlip();
	});

	// 返回按钮点击事件
	backBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		toggleFlip();
	});
}